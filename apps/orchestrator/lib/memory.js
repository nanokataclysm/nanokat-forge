const fs = require('fs').promises;
const path = require('path');

// In-memory store: category → { data, timestamp }
const store = new Map();

// Path to persistent memory file
const MEMORY_FILE = path.join(__dirname, '..', '..', '..', 'agent-memory.json');

// Load agent roles and persistent memory
let ROLES = [];

async function loadRoles() {
  try {
    const rolesPath = path.join(__dirname, '..', '..', '..', 'agent-roles.json');
    const data = await fs.readFile(rolesPath, 'utf8');
    const parsed = JSON.parse(data);
    ROLES = Array.isArray(parsed.roles) ? parsed.roles : [];
  } catch (err) {
    console.warn('[memory] Warning: could not load agent-roles.json — role-based access disabled:', err.message);
    ROLES = [];
  }
}

async function loadMemory() {
  try {
    const data = await fs.readFile(MEMORY_FILE, 'utf8');
    const parsed = JSON.parse(data);
    if (typeof parsed === 'object' && parsed !== null) {
      for (const [category, entry] of Object.entries(parsed)) {
        if (entry && typeof entry === 'object' && 'data' in entry && 'timestamp' in entry) {
          store.set(category, entry);
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn('[memory] Warning: could not load agent-memory.json:', err.message);
    }
    // If file doesn’t exist, start fresh
  }
}

async function saveMemory() {
  try {
    const serialized = {};
    for (const [category, entry] of store.entries()) {
      serialized[category] = entry;
    }
    await fs.writeFile(MEMORY_FILE, JSON.stringify(serialized, null, 2), 'utf8');
  } catch (err) {
    console.error('[memory] Error saving agent-memory.json:', err.message);
  }
}

// Initialize on first use
let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await loadRoles();
    await loadMemory();
    initialized = true;
  }
}

/**
 * Store data under a memory category.
 * @param {string} category - e.g., 'client-preferences'
 * @param {any} data - serializable value
 * @param {string} role - role ID (e.g., 'designer') requesting write
 * @returns {boolean} true if stored successfully
 */
async function store(category, data, role) {
  await ensureInitialized();

  // If roles loaded, validate write permission
  if (ROLES.length > 0) {
    const r = ROLES.find(r => r.id === role);
    if (!r || !r.memory_scope?.includes(category)) {
      throw new Error(`Role '${role}' is not authorized to write to memory category '${category}'`);
    }
  }

  store.set(category, {
    data,
    timestamp: Date.now(),
  });
  await saveMemory();
  return true;
}

/**
 * Recall data from a memory category.
 * @param {string} category - e.g., 'client-preferences'
 * @param {string} role - role ID requesting read
 * @returns {any|null} stored data, or null if unauthorized/missing
 */
async function recall(category, role) {
  await ensureInitialized();

  // Check read authorization
  if (ROLES.length > 0) {
    const r = ROLES.find(r => r.id === role);
    if (!r || !r.memory_scope?.includes(category)) {
      return null; // silent deny — no leak
    }
  }

  const entry = #store.get(category);
  return entry ? entry.data : null;
}

/**
 * Clear all data in a category (admin use only)
 * @param {string} category
 * @returns {boolean}
 */
async function clear(category) {
  const result = store.delete(category);
  await saveMemory();
  return result;
}

/**
 * List all category names currently stored
 * @returns {string[]}
 */
function listCategories() {
  return Array.from(#store.keys());
}

// Export
module.exports = {
  store,
  recall,
  clear,
  listCategories,
};
