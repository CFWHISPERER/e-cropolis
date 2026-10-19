# E-Cropolis — Development Journal

**Version:** 0.1  
**Last reviewed:** October 10, 2026  
**Purpose:** Maintain a chronological, evidence-conscious record of technical work, discoveries, obstacles and unresolved questions.
*Please note our overall modus-operandi is driven by a bootstrapped model which can be easily replicated without palpable capital equipment costs.*

## September 30 – October 2, 2026: Initial development environment

**Objective:** Establish a working environment for investigating MicropolisCore as a possible simulation foundation for E-Cropolis.

### Environment established

- Windows 11 host with WSL2.
- Ubuntu 24.04.1 development environment.
- Git, Python, GCC/G++, GNU Make, Node.js, npm, pnpm and Emscripten configured.
- Emscripten version 6.0.10 reported working.

### Difficulties encountered

Initial attempts to clone MicropolisCore encountered network transfer errors, including interrupted Git downloads.

Further troubleshooting and environment preparation were required.

### Outcome

Development environment established and MicropolisCore obtained successfully.

**Status:** Completed for initial development; current configuration should be rechecked.

---

## October 2, 2026: MicropolisCore baseline

**Repository:** https://github.com/SimHacker/MicropolisCore

**Local directory:** `~/Developer/MicropolisCore`

### Recorded results

- Full Git repository successfully cloned.
- Browser-based Micropolis reported running.
- Automated test suite reported **80/80 passing**.
- Main branch left clean after restoring generated build artifacts.

### Known limitations

- Screen Angel omitted because of an unavailable Linux backend.
- MooShow conflict left unresolved.

### Outcome

A working MicropolisCore baseline was demonstrated.

**Status:** Baseline run previously verified through terminal results. Reproduction in the current environment remains to be documented.

---

## October 2, 2026: MOOLLM repository

**Local directory:** `~/Developer/moollm`

**Recorded commit:** `0e7dacba`

### Work completed

- MOOLLM repository cloned.
- Main branch reported clean.
- Quickstart documentation examined.
- Documentation indicated that the repository itself forms the working environment rather than requiring a conventional installation.

### Important qualification

Repository cloning does not establish that MOOLLM was executing agents or interacting with MicropolisCore.

Relevant interface and tick-based interaction documents were identified as designs rather than verified implementations.

**Status:** Repository obtained; operational capabilities and integration unverified.

---

## October 10, 2026: Development record review

A review of previous work established that E-Cropolis documentation had understated the progress already achieved with MicropolisCore.

### Findings

1. MicropolisCore had previously run successfully.
2. Its automated tests had passed.
3. MOOLLM had been cloned and investigated.
4. No successful MOOLLM–Micropolis interaction was established in the available records.

### Next investigation

Determine how MOOLLM could observe and influence a running Micropolis simulation, beginning with the smallest possible reproducible interaction.

**Proposed experiment:** `development/experiments/001-moollm-micropolis.md`

**Status:** Proposed, not executed.

---

## Journal conventions

Each future entry should record:

- **Date:** When the work occurred.
- **Objective:** What we were attempting.
- **Actions:** Commands, changes or investigations performed.
- **Observations:** Actual outputs and behavior.
- **Evidence:** Logs, screenshots, commits or references.
- **Outcome:** Completed, partial, failed or unverified.
- **Next action:** The smallest useful follow-up.

Historical entries reconstructed from conversations must be identified as such. They must not be presented as freshly reproduced tests.

---

## October 14–19, 2026: Reproducible simulation and landscape interventions

**Objective:** Establish reproducible Micropolis simulation behavior and investigate how controlled landscape changes affect its internal measurements.

### Experimental progression

- **Experiment 009 — Reproducible Clock:** Verified deliberate phase stepping and observed the relationship between `phaseCycle` and `simCycle` in the browser.
- **Experiment 010 — Reproducible Native Engine Evolution:** Two independently initialized simulations, using the Haight city and random seed `20261011`, produced identical maps and selected state measurements over 32 synchronized ticks.
- **Experiment 011 — Controlled Landscape Perturbation:** Replacing DIRT with WOODS at `(7,10)` produced one persistent map difference, without additional map divergence over 32 ticks.
- **Experiment 012 — Environmental Response:** Extended observation to 320 ticks. A terrain-density difference first appeared at tick 269.
- **Experiment 013 — Spatial Footprint:** Measured all 750 terrain-density cells. At ticks 269 and 320, five cells differed, with a summed effect of +15.
- **Experiment 014A — Separated Interventions:** Four independently initialized simulations showed additive terrain-density effects of +15 and +16, combining to +31 at the sampled checkpoints.
- **Experiment 014B — Adjacent Interventions:** Adjacent DIRT-to-WOODS and ROAD-to-WOODS changes produced a combined terrain-density effect of +30 across eight affected cells. The measured interaction term was zero in all 750 cells at ticks 268, 269 and 320.

### Unexpected software defect

During Experiment 014B, the original four-city test encountered a WebAssembly memory-access failure at tick 82.

Investigation identified construction of a C++ `SimSprite` object using raw allocation despite its containing a `std::string` member.

Source corrections introduced proper C++ object construction and simulator sprite-lifecycle cleanup.

An isolated corrected WASM build completed successfully, and the four-city diagnostic reproduced the recorded checkpoint results over 320 ticks.

The restored application-level Experiment 014B Vitest test also passed, along with TypeScript checking.

The existing generated application WASM artifacts were not rebuilt from the corrected source during this validation.

### Evidence and provenance

Technical reports and test sources are maintained in the local MicropolisCore repository:

`~/Developer/MicropolisCore/experiments/e-cropolis/`

Relevant local commits include:

- `62e59f1` — Experiment 014A
- `8a2e498` — Callback ownership and TypeScript maintenance
- `a86b9e0` — Sprite allocation and lifecycle correction
- `9174ab9` — Experiment 014B documentation and regression test
- `95cf5b1` — Experiment 014B report permission correction

These commits were recorded locally as of October 19, 2026; publication to a remote repository has not been established.

### Interpretation and limitations

The experiments establish reproducible behavior and measurable spatial responses within the tested Micropolis engine configuration.

They do not demonstrate ecological regeneration, biological interaction, improved soil function, biodiversity, or ecosystem resilience.

The zero interaction measured in Experiments 014A and 014B concerns simulator terrain-density arithmetic at specified checkpoints. It must not be interpreted as evidence that ecological interventions are independent or additive in living systems.

### Outcome

**Completed:** Controlled simulation experiments 010–014B, documented checkpoint measurements, isolated validation of the corrected C++ source, and application-level regression testing.

**Outstanding:** Rebuild and validate generated application WASM artifacts from the corrected source as a separately agreed integration step.

### Next investigation

Review the public project status and roadmap against the verified technical progress.

Then identify a small, evidence-grounded ecological mechanism suitable for Experiment 015, explicitly distinguishing real biological processes from existing Micropolis terrain calculations.
