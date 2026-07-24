# install_mcp.sh Security Review

## Overview
The `install_mcp.sh` script sets up the Python virtual environment for the NANOKAT Forge MCP server.

## Security Assessment: ✓ SAFE

### Positive Security Patterns
- ✓ **Fail-fast:** Uses `set -euo pipefail` to exit on errors
- ✓ **No privilege escalation:** No `sudo` or root requirements
- ✓ **No remote execution:** No `curl | sh` or `wget | bash` patterns
- ✓ **Isolated environment:** Creates dedicated venv (`.venv-mcp`)
- ✓ **Pinned dependencies:** Installs from `requirements-mcp.txt` (version-controlled)
- ✓ **No binary downloads:** Only uses standard Python package manager (pip)
- ✓ **Configurable paths:** Respects `NK_FORGE_ROOT` and `NK_MCP_VENV` environment variables

### What It Does
1. Creates Python virtual environment at `$ROOT/.venv-mcp`
2. Upgrades pip to latest version
3. Installs dependencies from `requirements-mcp.txt`
4. Prints test commands for verification

### Usage
```bash
# Default (uses ~/hack/nk-forge)
./install_mcp.sh

# Custom root
NK_FORGE_ROOT=/path/to/forge ./install_mcp.sh

# Custom venv location
NK_MCP_VENV=/path/to/venv ./install_mcp.sh
```

### Verification
After installation, verify the setup:
```bash
.venv-mcp/bin/python test_connection.py
.venv-mcp/bin/python test_connection.py --with-vector
```

## Recommendations
- ✓ Script is safe to run as-is
- Consider adding `--require-hashes` to pip install for supply chain hardening
- Consider adding checksum verification for `requirements-mcp.txt`
- Document that script requires Python 3.8+ (implicit requirement)

## Audit Trail
- **Reviewed:** 2026-07-23 (Robert Shell security audit)
- **Status:** Approved for use
- **Risk Level:** Low
