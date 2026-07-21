# NANOKAT Forge MCP — cleaned local version

This bundle replaces the pasted prototype with a scoped local MCP server.

## Main corrections

- Runtime state defaults to `~/.local/share/nanokat-forge/mcp`, outside Git.
- Repository paths cannot escape through absolute paths, `..`, or symlinks.
- File writes are disabled by default.
- Enabled writes are limited to configured repository roots.
- The SHA-256 placeholder was replaced with real FastEmbed vectors.
- Collection size is derived from the actual embedding vector.
- SQLite uses context managers, WAL mode, constraints, and UTC timestamps.
- File, memory, log, and query sizes are bounded.
- The smoke test verifies behavior rather than only sleeping and checking folders.
- `sqlite3` was removed from pip dependencies because it is part of Python.
- Unused `pyyaml`, `openai`, `crewai`, and `langchain-mcp-adapters` dependencies were removed from this base server.

## Install

Copy these files into `~/hack/nk-forge`, then:

```bash
cd ~/hack/nk-forge
python3 -m venv .venv-mcp
.venv-mcp/bin/python -m pip install --upgrade pip
.venv-mcp/bin/python -m pip install -r requirements-mcp.txt
```

## Test

Basic test, without downloading the embedding model:

```bash
.venv-mcp/bin/python test_connection.py
```

Full vector-memory test:

```bash
.venv-mcp/bin/python test_connection.py --with-vector
```

The first vector test may download the small local embedding model.

## Start read-only

```bash
cd ~/hack/nk-forge
.venv-mcp/bin/python nk_forge_mcp_server.py
```

## Opt into scoped writes

```bash
export NK_MCP_ALLOW_WRITES=1
export NK_MCP_WRITE_ROOTS='apps/orchestrator,docs,generated'
.venv-mcp/bin/python nk_forge_mcp_server.py
```

## Environment options

```text
NK_FORGE_ROOT
NK_MCP_STATE_DIR
NK_MCP_ALLOW_WRITES
NK_MCP_WRITE_ROOTS
NK_MCP_COLLECTION
NK_MCP_EMBED_MODEL
NK_MCP_MAX_FILE_BYTES
NK_MCP_MAX_MEMORY_CHARS
NK_MCP_MAX_LOG_CHARS
```

## Git hygiene

If the old prototype already created runtime state inside the repository, inspect and back it up before removing anything. These paths should normally be ignored:

```gitignore
nk_society.db
nk_society.db-*
qdrant_data/
logs/
.venv-mcp/
```
