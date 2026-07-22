const intakePanel = document.querySelector("#intake-panel");
const approvalPanel = document.querySelector("#approval-panel");
const resultPanel = document.querySelector("#result-panel");

const accessCode = document.querySelector("#access-code");
const briefInput = document.querySelector("#brief");
const planButton = document.querySelector("#plan-button");
const approveButton = document.querySelector("#approve-button");
const reviseButton = document.querySelector("#revise-button");
const restartButton = document.querySelector("#restart-button");

const planMessage = document.querySelector("#plan-message");
const buildMessage = document.querySelector("#build-message");
const planSummary = document.querySelector("#plan-summary");
const executionTrace = document.querySelector("#execution-trace");
const previewFrame = document.querySelector("#preview-frame");

let currentPlan = null;
/** One-time approval nonce from POST /api/approve (session cookie is HttpOnly). */
let approvalNonce = null;

function text(value, fallback = "Not specified") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return JSON.stringify(value);
}

function list(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return (
          item.name ??
          item.title ??
          item.label ??
          item.hex ??
          item.value ??
          item.color ??
          JSON.stringify(item)
        );
      }
      return String(item);
    });
  }

  // Qwen often returns palettes as { primary, secondary, accent, ... }
  if (value && typeof value === "object") {
    const preferred = ["primary", "secondary", "accent", "background", "text"];
    const colors = [];
    for (const key of preferred) {
      if (typeof value[key] === "string" && value[key].trim()) {
        colors.push(value[key].trim());
      }
    }
    if (colors.length > 0) return colors.slice(0, 5);
    return Object.values(value)
      .filter((item) => typeof item === "string" && item.trim())
      .slice(0, 5);
  }

  return [text(value)];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderPalette(items) {
  return `
    <ul class="palette-list">
      ${items
        .map((item) => {
          const value = String(item).trim();
          const validColor =
            /^#[0-9a-f]{3,8}$/i.test(value) ||
            /^(rgb|hsl)a?\([^)]+\)$/i.test(value);

          return `
            <li class="palette-chip">
              <span
                class="palette-swatch"
                ${validColor ? `style="background:${escapeHtml(value)}"` : ""}
                aria-hidden="true"
              ></span>
              <span>${escapeHtml(value)}</span>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function show(panel) {
  for (const element of [intakePanel, approvalPanel, resultPanel]) {
    element.classList.toggle("hidden", element !== panel);
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPlan(plan) {
  const pages = list(plan.pages);
  const palette = list(plan.palette);
  const validations = list(plan.validationSteps);
  const risks = list(plan.risks);

  planSummary.innerHTML = `
    <div class="plan-grid">
      <article class="plan-card">
        <h3>Business</h3>
        <p>${escapeHtml(text(plan.businessSummary))}</p>
      </article>

      <article class="plan-card">
        <h3>Archetype</h3>
        <p>${escapeHtml(text(plan.archetype))}</p>
      </article>

      <article class="plan-card">
        <h3>Motif</h3>
        <p>${escapeHtml(text(plan.motif))}</p>
      </article>

      <article class="plan-card">
        <h3>Palette</h3>
        ${renderPalette(palette)}
      </article>

      <article class="plan-card">
        <h3>Pages</h3>
        ${renderList(pages)}
      </article>

      <article class="plan-card">
        <h3>Validation</h3>
        ${renderList(validations)}
      </article>

      <article class="plan-card">
        <h3>Risks</h3>
        ${renderList(risks)}
      </article>
    </div>
  `;
}

function renderTrace(trace) {
  executionTrace.innerHTML = trace
    .map(
      (item) => `
        <div class="trace-item">
          <span class="trace-check">✓</span>
          <span>${escapeHtml(item)}</span>
        </div>
      `,
    )
    .join("");
}

function renderPreview(preview) {
  const pages = list(preview.pages);
  const palette = list(preview.palette);
  const background = palette[1] ?? "#f3efe6";
  const accent = palette[0] ?? "#8f3f2c";
  const foreground = palette[2] ?? "#202020";

  previewFrame.innerHTML = `
    <article
      class="preview-site"
      style="background:${escapeHtml(background)};color:${escapeHtml(foreground)}"
    >
      <header class="preview-hero">
        <div class="preview-kicker" style="color:${escapeHtml(accent)}">
          ${escapeHtml(text(preview.motif, "Independent craft"))}
        </div>

        <h2 class="preview-title">${escapeHtml(text(preview.name, "Moonlit Kiln"))}</h2>
        <p class="preview-summary">${escapeHtml(text(preview.summary))}</p>

        <button
          type="button"
          style="background:${escapeHtml(accent)};border-color:${escapeHtml(accent)}"
        >
          Explore the work
        </button>
      </header>

      <section class="preview-pages">
        ${pages
          .map(
            (page, index) => `
              <div class="preview-page">
                <strong>${String(index + 1).padStart(2, "0")} · ${escapeHtml(page)}</strong>
                <span>Generated from the approved Qwen plan.</span>
              </div>
            `,
          )
          .join("")}
      </section>
    </article>
  `;
}

planButton.addEventListener("click", async () => {
  const brief = briefInput.value.trim();
  const token = accessCode.value.trim();

  if (!token) {
    planMessage.textContent = "Enter the private demo access code.";
    return;
  }

  if (!brief) {
    planMessage.textContent = "Enter a business brief.";
    return;
  }

  planButton.disabled = true;
  planMessage.textContent = "Qwen is structuring the request…";

  try {
    const response = await fetch("/api/plan", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-nanokat-demo-token": token,
      },
      body: JSON.stringify({ brief }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error ?? "Planning failed");
    }

    currentPlan = payload.plan;
    renderPlan(currentPlan);
    planMessage.textContent = "";
    show(approvalPanel);
  } catch (error) {
    planMessage.textContent =
      error instanceof Error ? error.message : "Planning failed";
  } finally {
    planButton.disabled = false;
  }
});

approveButton.addEventListener("click", async () => {
  if (!currentPlan) return;

  const token = accessCode.value.trim();
  approveButton.disabled = true;
  buildMessage.textContent = "Binding approval to a server session…";

  try {
    // 1) Session-bound approval: HttpOnly cookie + one-time nonce + plan digest
    const approveResponse = await fetch("/api/approve", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-nanokat-demo-token": token,
      },
      body: JSON.stringify({ plan: currentPlan }),
    });

    const approvePayload = await approveResponse.json();
    if (!approveResponse.ok || !approvePayload.ok) {
      throw new Error(approvePayload.error ?? "Approval session failed");
    }

    approvalNonce = approvePayload.nonce;
    buildMessage.textContent = "Running the scoped preview builder…";

    // 2) Preview only with valid session cookie + matching plan + unused nonce
    const response = await fetch("/api/build-preview", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        "x-nanokat-demo-token": token,
      },
      body: JSON.stringify({
        plan: currentPlan,
        nonce: approvalNonce,
      }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.error ?? "Preview build failed");
    }

    approvalNonce = null;
    renderTrace(payload.trace);
    renderPreview(payload.preview);
    buildMessage.textContent = "";
    show(resultPanel);
  } catch (error) {
    buildMessage.textContent =
      error instanceof Error ? error.message : "Preview build failed";
  } finally {
    approveButton.disabled = false;
  }
});

reviseButton.addEventListener("click", () => {
  approvalNonce = null;
  show(intakePanel);
});

restartButton.addEventListener("click", () => {
  currentPlan = null;
  approvalNonce = null;
  planSummary.innerHTML = "";
  executionTrace.innerHTML = "";
  previewFrame.innerHTML = "";
  show(intakePanel);
});
