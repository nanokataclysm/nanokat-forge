import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_IDS = Object.freeze([
  'navigator',
  'cartographer',
  'architect',
  'builder',
  'validator',
  'sentinel',
  'operator',
  'designer',
  'curator',
]);

const EXPECTED_MODES = Object.freeze({
  navigator: 'read-only',
  cartographer: 'read-only',
  architect: 'read-only',
  builder: 'bounded-write',
  validator: 'allowlisted-checks',
  sentinel: 'read-only',
  operator: 'bounded-command',
  designer: 'bounded-write',
  curator: 'bounded-write',
});

const EXPECTED_ALLOWED_ACTIONS = Object.freeze({
  navigator: ['repository-inspection', 'routing-proposals'],
  cartographer: ['repository-inspection', 'source-reconciliation'],
  architect: ['repository-inspection', 'architecture-planning'],
  builder: ['approved-path-scoped-working-tree-edits'],
  validator: ['allowlisted-non-mutating-checks'],
  sentinel: ['repository-inspection'],
  operator: ['approved-bounded-commands'],
  designer: ['approved-ui-design-edits'],
  curator: ['approved-documentation-edits'],
});

const EXPECTED_GATES = Object.freeze({
  navigator: [],
  cartographer: [],
  architect: [],
  builder: ['approved-path-scoped-working-tree-edits'],
  validator: [],
  sentinel: [],
  operator: ['approved-bounded-commands'],
  designer: ['approved-ui-design-edits'],
  curator: ['approved-documentation-edits'],
});

const PERMITTED_ACTIONS = Object.freeze([
  'repository-inspection',
  'source-reconciliation',
  'routing-proposals',
  'architecture-planning',
  'approved-path-scoped-working-tree-edits',
  'approved-ui-design-edits',
  'approved-documentation-edits',
  'allowlisted-non-mutating-checks',
  'approved-bounded-commands',
]);

const GLOBAL_FORBIDDEN_ACTIONS = Object.freeze([
  'git-index-mutation',
  'staging',
  'committing',
  'pushing',
  'merging',
  'deployment',
  'production-mutation',
  'destructive-actions',
  'protected-path-mutation',
  'secret-printing',
  'granting-approval',
  'persona-switching',
  'automatic-delegation',
]);

const ACTION_VOCABULARY = new Set([
  ...PERMITTED_ACTIONS,
  ...GLOBAL_FORBIDDEN_ACTIONS,
]);

const REQUIRED_FIELDS = Object.freeze([
  'id',
  'display_name',
  'purpose',
  'responsibilities',
  'required_inputs',
  'allowed_actions',
  'forbidden_actions',
  'default_mode',
  'output_contract',
  'verification_requirements',
  'stop_conditions',
  'human_approval_gates',
]);

const OPTIONAL_FIELDS = Object.freeze(['handoff_targets', 'tone']);
const ALLOWED_FIELDS = new Set([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);

const REQUIRED_STRING_FIELDS = Object.freeze([
  'id',
  'display_name',
  'purpose',
  'default_mode',
  'output_contract',
]);

const REQUIRED_NONEMPTY_ARRAY_FIELDS = Object.freeze([
  'responsibilities',
  'required_inputs',
  'allowed_actions',
  'forbidden_actions',
  'verification_requirements',
  'stop_conditions',
]);

const ARRAY_FIELDS = Object.freeze([
  ...REQUIRED_NONEMPTY_ARRAY_FIELDS,
  'human_approval_gates',
  'handoff_targets',
]);

const PROHIBITED_FIELDS = new Set([
  'approve',
  'approval_authority',
  'auto_delegate_to',
  'delegate_to',
  'execution_triggers',
  'auto_execute',
  'reasoning_trace',
  'internal_monologue',
  'confidence_threshold',
  'certainty_score',
  'primary_directive',
]);

const EXPECTED_PERSONA_SPECIFIC_FORBIDDEN = Object.freeze({
  validator: [
    'approved-path-scoped-working-tree-edits',
    'approved-ui-design-edits',
    'approved-documentation-edits',
    'approved-bounded-commands',
  ],
  operator: [
    'approved-path-scoped-working-tree-edits',
    'approved-ui-design-edits',
    'approved-documentation-edits',
  ],
  designer: [
    'approved-path-scoped-working-tree-edits',
    'approved-documentation-edits',
    'approved-bounded-commands',
  ],
  curator: [
    'approved-path-scoped-working-tree-edits',
    'approved-ui-design-edits',
    'approved-bounded-commands',
  ],
});

function isPlainObject(value) {
  return (
    typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype
  );
}

function arraysEqual(left, right) {
  return (
    Array.isArray(left)
    && Array.isArray(right)
    && left.length === right.length
    && left.every((value, index) => value === right[index])
  );
}

function validateStringArray(personaId, fieldName, value, diagnostics, { allowEmpty }) {
  if (!Array.isArray(value)) {
    diagnostics.push(`Persona "${personaId}": field "${fieldName}" must be an array.`);
    return;
  }

  if (!allowEmpty && value.length === 0) {
    diagnostics.push(`Persona "${personaId}": field "${fieldName}" must not be empty.`);
  }

  const seen = new Set();
  value.forEach((item, index) => {
    if (typeof item !== 'string' || item.trim() === '') {
      diagnostics.push(
        `Persona "${personaId}": field "${fieldName}"[${index}] must be a non-empty string.`,
      );
      return;
    }

    if (seen.has(item)) {
      diagnostics.push(
        `Persona "${personaId}": field "${fieldName}" contains duplicate value "${item}".`,
      );
    }
    seen.add(item);
  });
}

export function validateDevelopmentPersonas(data) {
  const diagnostics = [];

  if (!isPlainObject(data)) {
    return ['Root value must be a plain object.'];
  }

  const rootKeys = Object.keys(data).sort();
  if (!arraysEqual(rootKeys, ['personas'])) {
    diagnostics.push('Root object must contain exactly one key: "personas".');
    return diagnostics;
  }

  if (!Array.isArray(data.personas)) {
    diagnostics.push('Root field "personas" must be an array.');
    return diagnostics;
  }

  if (data.personas.length !== EXPECTED_IDS.length) {
    diagnostics.push(
      `Expected exactly ${EXPECTED_IDS.length} personas, found ${data.personas.length}.`,
    );
  }

  const observedIds = [];
  const idCounts = new Map();

  data.personas.forEach((persona, index) => {
    if (!isPlainObject(persona)) {
      diagnostics.push(`Persona at index ${index} must be a plain object.`);
      return;
    }

    const personaId =
      typeof persona.id === 'string' && persona.id.trim() !== ''
        ? persona.id
        : `index-${index}`;

    observedIds.push(persona.id);
    idCounts.set(persona.id, (idCounts.get(persona.id) ?? 0) + 1);

    const keys = Object.keys(persona);
    keys.forEach((key) => {
      if (!ALLOWED_FIELDS.has(key)) {
        diagnostics.push(`Persona "${personaId}": prohibited or unknown field "${key}".`);
      }
      if (PROHIBITED_FIELDS.has(key)) {
        diagnostics.push(`Persona "${personaId}": prohibited field "${key}" is not allowed.`);
      }
    });

    REQUIRED_FIELDS.forEach((field) => {
      if (!Object.hasOwn(persona, field)) {
        diagnostics.push(`Persona "${personaId}": missing required field "${field}".`);
      }
    });

    REQUIRED_STRING_FIELDS.forEach((field) => {
      const value = persona[field];
      if (typeof value !== 'string' || value.trim() === '') {
        diagnostics.push(`Persona "${personaId}": field "${field}" must be a non-empty string.`);
      }
    });

    if (Object.hasOwn(persona, 'tone')) {
      if (typeof persona.tone !== 'string' || persona.tone.trim() === '') {
        diagnostics.push(`Persona "${personaId}": optional field "tone" must be a non-empty string.`);
      }
    }

    REQUIRED_NONEMPTY_ARRAY_FIELDS.forEach((field) => {
      validateStringArray(personaId, field, persona[field], diagnostics, { allowEmpty: false });
    });

    validateStringArray(
      personaId,
      'human_approval_gates',
      persona.human_approval_gates,
      diagnostics,
      { allowEmpty: true },
    );

    if (Object.hasOwn(persona, 'handoff_targets')) {
      validateStringArray(
        personaId,
        'handoff_targets',
        persona.handoff_targets,
        diagnostics,
        { allowEmpty: true },
      );
    }

    const expectedId = EXPECTED_IDS[index];
    if (expectedId !== undefined && persona.id !== expectedId) {
      diagnostics.push(
        `Persona "${personaId}": expected ID "${expectedId}" at index ${index}.`,
      );
    }

    const expectedMode = EXPECTED_MODES[persona.id];
    if (expectedMode === undefined) {
      diagnostics.push(`Persona "${personaId}": unexpected persona ID.`);
    } else if (persona.default_mode !== expectedMode) {
      diagnostics.push(
        `Persona "${personaId}": expected default_mode "${expectedMode}", found "${persona.default_mode}".`,
      );
    }

    const expectedAllowed = EXPECTED_ALLOWED_ACTIONS[persona.id];
    if (expectedAllowed !== undefined && !arraysEqual(persona.allowed_actions, expectedAllowed)) {
      diagnostics.push(
        `Persona "${personaId}": allowed_actions must be exactly [${expectedAllowed.join(', ')}].`,
      );
    }

    const expectedGates = EXPECTED_GATES[persona.id];
    if (expectedGates !== undefined && !arraysEqual(persona.human_approval_gates, expectedGates)) {
      diagnostics.push(
        `Persona "${personaId}": human_approval_gates must be exactly [${expectedGates.join(', ')}].`,
      );
    }

    for (const fieldName of ['allowed_actions', 'forbidden_actions', 'human_approval_gates']) {
      const actions = persona[fieldName];
      if (!Array.isArray(actions)) {
        continue;
      }

      actions.forEach((action) => {
        if (typeof action === 'string' && !ACTION_VOCABULARY.has(action)) {
          diagnostics.push(
            `Persona "${personaId}": unknown action token "${action}" in "${fieldName}".`,
          );
        }
      });
    }

    if (Array.isArray(persona.forbidden_actions)) {
      GLOBAL_FORBIDDEN_ACTIONS.forEach((action) => {
        if (!persona.forbidden_actions.includes(action)) {
          diagnostics.push(
            `Persona "${personaId}": missing globally forbidden action "${action}".`,
          );
        }
      });

      const personaSpecific = EXPECTED_PERSONA_SPECIFIC_FORBIDDEN[persona.id] ?? [];
      personaSpecific.forEach((action) => {
        if (!persona.forbidden_actions.includes(action)) {
          diagnostics.push(
            `Persona "${personaId}": missing persona-specific forbidden action "${action}".`,
          );
        }
      });
    }

    for (const fieldName of ['allowed_actions', 'human_approval_gates']) {
      const actions = persona[fieldName];
      if (!Array.isArray(actions)) {
        continue;
      }

      actions.forEach((action) => {
        if (GLOBAL_FORBIDDEN_ACTIONS.includes(action)) {
          diagnostics.push(
            `Persona "${personaId}": globally forbidden action "${action}" appears in "${fieldName}".`,
          );
        }
      });
    }

    if (
      Array.isArray(persona.allowed_actions)
      && Array.isArray(persona.human_approval_gates)
    ) {
      persona.human_approval_gates.forEach((gate) => {
        if (!persona.allowed_actions.includes(gate)) {
          diagnostics.push(
            `Persona "${personaId}": approval gate "${gate}" must also appear in allowed_actions.`,
          );
        }
      });
    }
  });

  EXPECTED_IDS.forEach((id) => {
    if (!observedIds.includes(id)) {
      diagnostics.push(`Missing expected persona ID "${id}".`);
    }
  });

  [...idCounts.entries()]
    .filter(([, count]) => count > 1)
    .forEach(([id]) => diagnostics.push(`Duplicate persona ID "${String(id)}".`));

  const validIds = new Set(
    data.personas
      .filter(isPlainObject)
      .map((persona) => persona.id)
      .filter((id) => typeof id === 'string'),
  );

  data.personas.forEach((persona, index) => {
    if (!isPlainObject(persona) || !Array.isArray(persona.handoff_targets)) {
      return;
    }

    const personaId =
      typeof persona.id === 'string' && persona.id.trim() !== ''
        ? persona.id
        : `index-${index}`;

    persona.handoff_targets.forEach((target) => {
      if (!validIds.has(target)) {
        diagnostics.push(
          `Persona "${personaId}": unresolved handoff target "${target}".`,
        );
      }
    });
  });

  return [...new Set(diagnostics)].sort((left, right) => left.localeCompare(right));
}

function runCli() {
  const scriptPath = fileURLToPath(import.meta.url);
  const scriptDirectory = path.dirname(scriptPath);
  const registryPath = path.join(scriptDirectory, 'policy', 'development-personas.json');

  try {
    const raw = fs.readFileSync(registryPath, 'utf8');
    const data = JSON.parse(raw);
    const diagnostics = validateDevelopmentPersonas(data);

    if (diagnostics.length > 0) {
      console.error('Development persona validation failed:');
      diagnostics.forEach((diagnostic) => console.error(`- ${diagnostic}`));
      process.exitCode = 1;
      return;
    }

    console.log(`Validated ${EXPECTED_IDS.length} development personas successfully.`);
    process.exitCode = 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Development persona validation failed: ${message}`);
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
const currentPath = fileURLToPath(import.meta.url);

if (invokedPath === currentPath) {
  runCli();
}
