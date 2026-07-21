const DEFAULT_PAGES = Object.freeze(["Home", "Work", "About", "Contact"]);
const DEFAULT_PALETTE = Object.freeze(["#9b4a35", "#f2eadf", "#202020"]);

const PALETTE_KEY_ORDER = Object.freeze([
  "primary",
  "secondary",
  "accent",
  "background",
  "foreground",
  "tertiary",
  "muted",
  "surface",
  "text",
]);

/**
 * Extract a CSS-ish color string from a palette entry.
 * Accepts plain hex/rgb strings or objects with hex/value/color fields.
 */
export function extractColor(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const candidate =
      value.hex ?? value.value ?? value.color ?? value.hexCode ?? null;
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return null;
}

/**
 * Normalize plan.pages into up to 6 display labels.
 */
export function normalizePages(pages) {
  if (!Array.isArray(pages) || pages.length === 0) {
    return [...DEFAULT_PAGES];
  }

  return pages.slice(0, 6).map((page) => {
    if (typeof page === "string") return page;
    if (page && typeof page === "object") {
      return (
        page.name ??
        page.title ??
        page.label ??
        page.slug ??
        JSON.stringify(page)
      );
    }
    return String(page);
  });
}

/**
 * Normalize plan.palette for preview.
 * Qwen often returns either a hex array or an object
 * like { primary, secondary, accent }.
 */
export function normalizePalette(palette) {
  if (Array.isArray(palette)) {
    const colors = palette
      .map(extractColor)
      .filter((color) => typeof color === "string" && color.length > 0)
      .slice(0, 3);
    return colors.length > 0 ? colors : [...DEFAULT_PALETTE];
  }

  if (palette && typeof palette === "object") {
    const colors = [];
    const seen = new Set();

    const push = (raw) => {
      const color = extractColor(raw);
      if (!color || seen.has(color.toLowerCase())) return;
      seen.add(color.toLowerCase());
      colors.push(color);
    };

    for (const key of PALETTE_KEY_ORDER) {
      if (Object.prototype.hasOwnProperty.call(palette, key)) {
        push(palette[key]);
      }
    }

    for (const [key, value] of Object.entries(palette)) {
      if (PALETTE_KEY_ORDER.includes(key)) continue;
      push(value);
    }

    if (colors.length > 0) {
      return colors.slice(0, 3);
    }
  }

  return [...DEFAULT_PALETTE];
}

/**
 * Build the isolated preview payload from an approved plan object.
 * Returns { ok: true, ... } or { ok: false, status, error, validation? }.
 */
export function buildPreviewFromPlan(plan) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
    return {
      ok: false,
      status: 400,
      error: "A valid approved plan is required",
    };
  }

  const pages = normalizePages(plan.pages);
  const palette = normalizePalette(plan.palette);

  const validation = {
    approved: true,
    isolatedPreview: true,
    pageCountValid: pages.length > 0 && pages.length <= 6,
    paletteCountValid: palette.length > 0 && palette.length <= 3,
    productionMutation: false,
    secretsAccessed: false,
  };

  if (!validation.pageCountValid || !validation.paletteCountValid) {
    return {
      ok: false,
      status: 422,
      error: "The approved plan failed preview validation",
      validation,
    };
  }

  return {
    ok: true,
    trace: [
      "Business brief received",
      "Qwen generated a structured website plan",
      "Human approval recorded",
      "Scoped preview builder invoked",
      "Plan constraints validated",
      "Isolated preview rendered",
      "No production resources changed",
    ],
    validation,
    preview: {
      name: plan.businessName ?? "Moonlit Kiln",
      summary: plan.businessSummary ?? "An independent creative business.",
      archetype: plan.archetype ?? "Craft / artisan",
      motif: plan.motif ?? "Handmade studio",
      pages,
      palette,
    },
  };
}
