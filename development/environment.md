# E-Cropolis — Development Environment

**Version:** 0.1  
**Last reviewed:** October 10, 2026  
**Status:** Historical configuration reconstructed from development sessions; current configuration requires verification.
*Once again our methodology is one of bootstrapping, we are using older retired devices in many cases.*

## 1. Purpose

This document records the hardware, operating systems, development tools, dependencies and configuration used to investigate and develop E-Cropolis.

Its objectives are to:

- Make experiments reproducible.
- Reduce repeated installation and troubleshooting work.
- Record compatibility issues and their resolutions.
- Distinguish verified configurations from proposed ones.
- Help future contributors establish compatible environments.

**Epistemic integrity:** A previously successful configuration is not necessarily the current configuration. Versions and results must be reverified when the environment changes.

## 2. Host Computer

| Component | Configuration |
|---|---|
| Host operating system | Windows 11 |
| Linux environment | Windows Subsystem for Linux (WSL2) |
| Primary development distribution | Ubuntu 24.04.1 LTS |
| Architecture | x86-64 |
| Development purpose | MicropolisCore, Emscripten and experimental agent integration |

Exact processor, memory, graphics hardware and storage specifications have not yet been documented.

## 3. WSL Configuration

The development environment was established under WSL2.

An October 2026 update changed the reported configuration:

| Component | Earlier | Updated |
|---|---|---|
| WSL | 2.3.26.0 | 3.0.1.0 |
| Linux kernel | 5.15.167.4-1 | 6.18.40.1-1 |
| WSLg | 1.0.65 | 1.0.79 |

A separate WSL container was also successfully started using Ubuntu 26.04.1 LTS.

**Important:** The Ubuntu 26.04 container and the primary Ubuntu 24.04 development distribution are distinct environments. They should not be treated as interchangeable without testing.

### Verification commands

Run in Windows PowerShell:

```powershell
wsl --version
wsl --list --verbose
```

Run inside the primary Ubuntu environment:

```bash
cat /etc/os-release
uname -a
```

## 4. Development Toolchain

Versions previously recorded:

| Tool | Version |
|---|---|
| GNU Make | 4.3 |
| GCC / G++ | 13.3.0 |
| Node.js | 22.23.3 |
| npm | 10.9.9 |
| pnpm | 12.8.1 |
| Emscripten SDK | 6.0.10 |

### Verification commands

```bash
make --version
gcc --version
g++ --version
node --version
npm --version
pnpm --version
emcc --version
python3 --version
git --version
```

Versions should be captured again before reproducing experiments.

## 5. MicropolisCore

**Upstream repository:** https://github.com/SimHacker/MicropolisCore

**Previously recorded directory:** `~/Developer/MicropolisCore`

### Historical progress

- Repository cloning encountered network interruptions.
- Clone was subsequently reported successful.
- Browser-based simulation was reported running.
- Automated test suite reportedly passed 80 of 80 tests.

These results belong to the earlier development sessions and should be reproduced before claiming the current environment is operational.

### Current verification

```bash
cd ~/Developer/MicropolisCore

git status
git remote -v
git rev-parse HEAD
```

Record the exact commit SHA and the documented build/test commands used.

**Current status:** Previously demonstrated; fresh verification pending.

## 6. MOOLLM

**Repository:** https://github.com/SimHacker/moollm

**Previously recorded directory:** `~/Developer/moollm`

**Historical commit:** `0e7dacba`

### Historical progress

- Repository cloned.
- Quickstart documentation examined.
- No completed interaction with MicropolisCore has been verified.

### Current verification

```bash
cd ~/Developer/moollm

git status
git remote -v
git rev-parse HEAD
```

**Current status:** Repository obtained; operational integration unverified.

## 7. Known Technical Issues

### Git download interruptions

During initial setup, Git operations encountered interrupted transfers and early EOF errors.

Troubleshooting included attempting shallow clones and HTTP/1.1 transfers.

**Outcome:** Initial repository acquisition difficulties were eventually overcome.

**Root cause:** Not conclusively established.

### Micropolis optional components

Historical development notes mention limitations involving Screen Angel and MooShow.

These require reinspection against the exact repository revision before being treated as current defects.

## 8. Reproducibility Checklist

Before recording a new experiment:

- [ ] Record date and environment.
- [ ] Confirm operating system and toolchain versions.
- [ ] Record relevant Git commit SHAs.
- [ ] Record commands used.
- [ ] Save meaningful output and errors.
- [ ] Distinguish expected results from observed results.
- [ ] Document unexpected behavior.
- [ ] Identify unresolved dependencies.
- [ ] Record whether the experiment can be repeated.

Do not store passwords, private keys, wallet recovery phrases or access tokens in the repository.

## 9. Planned Environment Improvements

- Record host hardware specifications.
- Capture a fresh toolchain inventory.
- Reproduce the MicropolisCore build and test results.
- Identify and document the exact browser launch procedure.
- Verify MOOLLM's available execution interfaces.
- Establish the first reproducible MicropolisCore–MOOLLM interaction.
- Consider automated environment checks and build validation.

## 10. Maintenance

Update this document whenever a change affects the ability to reproduce development or experimental results.

Routine development events belong in `JOURNAL.md`.

Changes to the environment belong here.

Changes to E-Cropolis software behavior belong in `CHANGELOG.md`.

---

*E-Cropolis — Project Lichen*

*Document the environment. Preserve the evidence. Reproduce the result.*
