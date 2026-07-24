# NANOKAT Forge MCP Server — Security & Capabilities

## Overview
The NANOKAT Forge MCP server (`nk_forge_mcp_server.py`) provides scoped, local access to repository files, agent memory, and interaction logging for AI agents working with the Forge codebase.

## Security Model

### Path Isolation & Access Control

**Repository Root:** All file operations are scoped to `$NK_FORGE_ROOT` (default: `~/hack/nk-forge`)

**Blocked Paths (Always):**
- `.git/`, `.ssh/`, `.gnupg/`, `.nanokat-secrets/`
- Any file starting with `.env` (e.g., `.env.local`, `.env.production`)
- Private key files: `.key`, `.pem`, `.p12`, `.pfx`

**Write Protection:**
- Writes are **disabled by default** (requires `NK_MCP_ALLOW_WRITES=1`)
- When enabled, writes are restricted to allowlisted directories:
  - `apps/orchestrator/`
  - `docs/`
  - `generated/`
- Configurable via `NK_MCP_WRITE_ROOTS` environment variable

**Path Validation:**
- All paths must be repository-relative (no absolute paths)
- Path traversal attacks blocked (e.g., `../../etc/passwd`)
- Symlink resolution enforced (must stay within repository)

### File Size Limits
- **Read/Write:** 1 MB per file (configurable via `NK_MCP_MAX_FILE_BYTES`)
- **Memory storage:** 50,000 characters per entry (configurable via `NK_MCP_MAX_MEMORY_CHARS`)
- **Log entries:** 20,000 characters per field (configurable via `NK_MCP_MAX_LOG_CHARS`)

### Data Storage

**SQLite Database:** `~/.local/share/nanokat-forge/mcp/nk_society.db`
- Stores interaction logs (agent name, task, outcome, tokens, duration)
- WAL mode enabled for concurrent access
- Foreign keys enforced

**Vector Store:** `~/.local/share/nanokat-forge/mcp/qdrant/`
- Local Qdrant instance for semantic memory
- Embeddings via `BAAI/bge-small-en-v1.5` (configurable)
- Collection: `agent_memory` (configurable via `NK_MCP_COLLECTION`)

**Markdown Logs:** `~/.local/share/nanokat-forge/mcp/logs/session_YYYYMMDD.md`
- Human-readable session logs
- One file per day
- Includes timestamps, agent names, tasks, outcomes

## Available Tools

### 1. `health()`
Returns server status and configuration.

**Returns:**
```json
{
  "ok": true,
  "server": "Nanokat-Forge-MCP",
  "repository": "/home/user/hack/nk-forge",
  "state_directory": "/home/user/.local/share/nanokat-forge/mcp",
  "database_exists": true,
  "collection_exists": true,
  "embedding_model": "BAAI/bge-small-en-v1.5",
  "writes_enabled": false,
  "write_roots": ["apps/orchestrator", "docs", "generated"]
}
```

### 2. `read_file(relative_path: str)`
Reads a file from the repository.

**Parameters:**
- `relative_path`: Repository-relative path (e.g., `apps/orchestrator/server.mjs`)

**Returns:**
```json
{
  "path": "apps/orchestrator/server.mjs",
  "bytes": 12345,
  "content": "..."
}
```

**Errors:**
- `ValueError`: Path validation failed or file too large
- `FileNotFoundError`: File does not exist
- `PermissionError`: Sensitive path blocked

### 3. `write_file(relative_path: str, content: str)`
Writes content to a file (requires `NK_MCP_ALLOW_WRITES=1`).

**Parameters:**
- `relative_path`: Repository-relative path within allowlisted roots
- `content`: File content (UTF-8)

**Returns:**
```json
{
  "ok": true,
  "path": "docs/example.md",
  "bytes": 1234
}
```

**Errors:**
- `PermissionError`: Writes disabled or path outside allowlisted roots
- `ValueError`: Content too large or path validation failed

### 4. `store_memory(category: str, text: str)`
Stores a semantic memory entry in the vector database.

**Parameters:**
- `category`: Memory category (e.g., "user_preference", "project_context")
- `text`: Memory content (max 50,000 chars)

**Returns:**
```json
{
  "ok": true,
  "memory_id": "uuid-here",
  "category": "user_preference",
  "created_at": "2026-07-23T19:45:00.000Z"
}
```

**Use Cases:**
- User preferences and settings
- Project-specific context
- Agent learnings and insights

### 5. `query_memory(query: str, limit: int = 3)`
Performs semantic search over stored memories.

**Parameters:**
- `query`: Search query
- `limit`: Max results (1-20, default 3)

**Returns:**
```json
{
  "query": "user coding preferences",
  "results": [
    {
      "memory_id": "uuid-here",
      "score": 0.85,
      "category": "user_preference",
      "text": "User prefers TypeScript over JavaScript",
      "created_at": "2026-07-23T19:45:00.000Z"
    }
  ]
}
```

### 6. `log_task(agent: str, task: str, outcome: str, tokens: int = 0, duration: float = 0.0)`
Logs an agent interaction to database and markdown logs.

**Parameters:**
- `agent`: Agent name (e.g., "Grok", "Codex")
- `task`: Task description
- `outcome`: Task outcome/result
- `tokens`: Token usage (optional)
- `duration`: Duration in seconds (optional)

**Returns:**
```json
{
  "ok": true,
  "interaction_id": 42
}
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NK_FORGE_ROOT` | `~/hack/nk-forge` | Repository root directory |
| `NK_MCP_STATE_DIR` | `~/.local/share/nanokat-forge/mcp` | State directory (DB, logs, vector store) |
| `NK_MCP_COLLECTION` | `agent_memory` | Qdrant collection name |
| `NK_MCP_EMBED_MODEL` | `BAAI/bge-small-en-v1.5` | Embedding model |
| `NK_MCP_MAX_FILE_BYTES` | `1000000` (1 MB) | Max file size for read/write |
| `NK_MCP_MAX_MEMORY_CHARS` | `50000` | Max memory entry size |
| `NK_MCP_MAX_LOG_CHARS` | `20000` | Max log field size |
| `NK_MCP_ALLOW_WRITES` | `0` (disabled) | Enable file writes (`1` to enable) |
| `NK_MCP_WRITE_ROOTS` | `apps/orchestrator,docs,generated` | Comma-separated write-allowed directories |

### Usage Example

```bash
# Read-only mode (default)
python nk_forge_mcp_server.py

# Enable writes to specific directories
NK_MCP_ALLOW_WRITES=1 \
NK_MCP_WRITE_ROOTS="apps/orchestrator,docs,generated,test-output" \
python nk_forge_mcp_server.py

# Custom repository location
NK_FORGE_ROOT=/path/to/other/repo \
python nk_forge_mcp_server.py
```

## Security Best Practices

### For Operators
1. **Keep writes disabled** unless actively needed for agent tasks
2. **Review write roots** before enabling writes
3. **Monitor logs** in `~/.local/share/nanokat-forge/mcp/logs/`
4. **Audit database** periodically for unexpected entries
5. **Backup state directory** before major agent operations

### For Agent Developers
1. **Validate paths** before passing to MCP tools
2. **Handle errors gracefully** (permission denied, file not found)
3. **Respect size limits** when reading/writing files
4. **Use categories** consistently for memory storage
5. **Log interactions** for audit trail and debugging

## Privilege Requirements

**Filesystem:**
- Read access to `$NK_FORGE_ROOT`
- Write access to `$NK_MCP_STATE_DIR` (for DB, logs, vector store)
- Write access to `$NK_FORGE_ROOT` (only if `NK_MCP_ALLOW_WRITES=1`)

**Network:**
- None (fully local operation)

**System:**
- Python 3.8+ with venv support
- Sufficient disk space for vector embeddings (~100 MB per 10k memories)

## Audit Trail

- **Reviewed:** 2026-07-23 (Robert Shell security audit)
- **Status:** Approved with documented restrictions
- **Risk Level:** Low (with writes disabled), Medium (with writes enabled)
- **Recommendation:** Keep writes disabled by default; enable only for specific tasks

## Related Documentation
- [Install Script Security](./INSTALL_MCP_SECURITY.md)
- [Repository Security Guidelines](../README.md#security--authentication)
