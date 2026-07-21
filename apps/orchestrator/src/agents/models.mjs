export const QWEN_MODELS = Object.freeze({
  navigator: process.env.QWEN_NAVIGATOR_MODEL || "qwen3.7-plus",
  researcher: process.env.QWEN_RESEARCHER_MODEL || "qwen3.7-plus",
  domainAnalyst: process.env.QWEN_DOMAIN_MODEL || "qwen3.7-plus",
  humanFactors: process.env.QWEN_HUMAN_FACTORS_MODEL || "qwen3.7-plus",
  optimisticStrategist: process.env.QWEN_OPTIMIST_MODEL || "qwen3.7-plus",
  skepticalAnalyst: process.env.QWEN_SKEPTIC_MODEL || "qwen3.7-plus",
  forecaster: process.env.QWEN_FORECASTER_MODEL || "qwen3.7-plus",
  synthesizer: process.env.QWEN_SYNTHESIZER_MODEL || "qwen3.7-plus",
  validator: process.env.QWEN_VALIDATOR_MODEL || "qwen3.7-plus",
  repairAgent: process.env.QWEN_REPAIR_MODEL || "qwen3.7-plus",
  builder: process.env.QWEN_BUILDER_MODEL || "qwen3.7-plus",
});

export function modelFor(role) {
  const model = QWEN_MODELS[role];

  if (!model) {
    throw new Error(`Unknown agent role: ${role}`);
  }

  return model;
}
