# Security Recommendations for NANOKAT Forge

## Completed Security Measures ✓

### 1. Demo Key Documentation
- ✓ Demo signing key scope documented in README
- ✓ Production authentication clearly differentiated
- ✓ Key properly gitignored

### 2. Install Script Security
- ✓ `install_mcp.sh` reviewed and documented
- ✓ No privilege escalation or remote execution
- ✓ See [INSTALL_MCP_SECURITY.md](./INSTALL_MCP_SECURITY.md)

### 3. MCP Server Security
- ✓ Path isolation and access control documented
- ✓ Write protection and sensitive path blocking
- ✓ See [MCP_SERVER_SECURITY.md](./MCP_SERVER_SECURITY.md)

### 4. Environment Configuration
- ✓ Complete `.env.example` with all required variables
- ✓ Clear documentation of optional vs required settings

### 5. Dependency Security
- ✓ **npm audit:** 0 vulnerabilities (69 production dependencies)
- ✓ **pip-audit:** 0 vulnerabilities (78 Python packages)
- ✓ Last checked: 2026-07-23

## Recommended Additional Measures

### Pre-Commit Hooks

To prevent accidental commits of sensitive files, consider adding pre-commit hooks:

#### Option 1: Using pre-commit framework

1. Install pre-commit:
```bash
pip install pre-commit
```

2. Create `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: check-added-large-files
        args: ['--maxkb=1000']
      - id: detect-private-key
      - id: check-merge-conflict
      - id: check-yaml
      - id: end-of-file-fixer
      - id: trailing-whitespace

  - repo: local
    hooks:
      - id: block-env-files
        name: Block .env files
        entry: bash -c 'if git diff --cached --name-only | grep -E "\.env(\.|$)"; then echo "ERROR: .env files should not be committed"; exit 1; fi'
        language: system
        pass_filenames: false
```

3. Install hooks:
```bash
pre-commit install
```

#### Option 2: Simple Git hook

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Block .env files and private keys

if git diff --cached --name-only | grep -E '\.(env|key|pem|p12|pfx)(\.|$)'; then
    echo "ERROR: Attempting to commit sensitive files:"
    git diff --cached --name-only | grep -E '\.(env|key|pem|p12|pfx)(\.|$)'
    echo ""
    echo "These files should never be committed. Add them to .gitignore."
    exit 1
fi

# Check for potential secrets in staged content
if git diff --cached | grep -iE '(api[_-]?key|secret|password|token).*=.*[a-zA-Z0-9]{20,}'; then
    echo "WARNING: Potential secrets detected in staged changes"
    echo "Review carefully before committing"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Regular Security Maintenance

#### Monthly Tasks
- [ ] Run `npm audit` in `apps/orchestrator/`
- [ ] Run `pip-audit` in project root
- [ ] Review MCP server logs for unusual activity
- [ ] Check for outdated dependencies: `npm outdated`, `pip list --outdated`

#### Quarterly Tasks
- [ ] Review and rotate demo secrets
- [ ] Audit `.gitignore` coverage
- [ ] Review MCP server write permissions
- [ ] Update security documentation

#### Before Production Deployment
- [ ] Generate new production signing keys
- [ ] Move secrets to secure vault (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager)
- [ ] Enable `NODE_ENV=production`
- [ ] Enable `FORCE_SECURE_COOKIES=true`
- [ ] Disable MCP server writes (`NK_MCP_ALLOW_WRITES=0`)
- [ ] Review and restrict MCP write roots
- [ ] Set up monitoring and alerting
- [ ] Document incident response procedures

### Security Contacts

For security issues or questions:
- **Repository:** https://github.com/nanokataclysm/nanokat-forge
- **Security Policy:** See `.github/SECURITY.md`
- **Private Reports:** Use GitHub Security Advisories

## Audit History

| Date | Auditor | Findings | Status |
|------|---------|----------|--------|
| 2026-07-23 | Robert Shell | 0 P0, 1 P1, 5 P2, 2 P3 | ✓ Remediated |

See full audit report: `/home/nanokat/nanokat-audits/robert-shell-20260723-193345/`
