# E-Cropolis — Development Roadmap

**Version:** 0.1  
**Updated:** October 9, 2026  
**Project phase:** Foundation and discovery  
**Parent initiative:** [Project Lichen](https://projectlichen.github.io/)  
**Companion document:** [STATUS.md](STATUS.md)

> **Guiding question:** What might people build here if they began by asking what was already here?

## Purpose

E-Cropolis explores how settlements affect the living systems and human communities of which they are part. It combines a developing narrative, empirical research and an experimental simulation. This roadmap records proposed work, sequencing, evidence requirements and criteria for completion; it is **not** a prediction of when particular capabilities will be delivered.

Our goal is not to make a simulation that confirms a preferred philosophy. It is to build a useful environment in which hypotheses can be tested, assumptions challenged, and results revised.

## Working rules

1. **Reality before mechanics.** Identify real processes and constraints before deciding how to represent them in the game.
2. **Make uncertainty visible.** Label observations, estimates, hypotheses, fictional elements and simulated outputs distinctly.
3. **Keep experiments reproducible.** Record software versions, input data, parameters, steps and results.
4. **Let models fail.** Preserve negative results and revise mechanisms when evidence warrants it.
5. **Prefer the smallest meaningful experiment.** Build incrementally instead of attempting an entire ecological city model at once.
6. **Respect provenance and rights.** Record data sources, licenses, limitations and land-management context.
7. **Keep the story and simulation in dialogue.** Narrative raises questions; experiments inform what the characters might plausibly discover.

## Milestone overview

| ID | Milestone | Current status | Evidence of completion |
|---|---|---|---|
| M0 | Public project foundation | In progress | Core documentation published and cross-linked |
| M1 | Reproducible MicropolisCore baseline | Planned | Documented build and repeatable run |
| M2 | Regional landscape evidence baseline | Planned | Versioned dataset inventory and documented fictional mapping |
| M3 | First ecological model and experiment | Planned | Reproducible test with assumptions and limitations |
| M4 | Settlement decisions and consequences | Proposed | At least two comparable scenarios and recorded outputs |
| M5 | Data Distance and governance experiments | Proposed | Defined information constraints and comparative tests |
| M6 | Accessible interactive prototype | Aspirational | Usable demonstration with visible model limitations |

**Status meanings:** *In progress* = work underway; *Planned* = agreed next work; *Proposed* = candidate direction, not yet committed; *Aspirational* = longer-term possibility. A completed milestone is not, by itself, scientific validation.

## M0 — Public project foundation

**Objective:** Make the project's purpose, progress, assumptions and decisions easy to discover.

- [ ] Publish `README.md`, `STATUS.md` and `ROADMAP.md`.
- [ ] Link the repository from the existing E-Cropolis page on Project Lichen's GitHub Pages site.
- [ ] Link the evolving Substack narrative from the repository and project page.
- [ ] Create `docs/principles/epistemic-integrity.md`.
- [ ] Start a dated decision log documenting choices, reasons, alternatives and reconsideration criteria.
- [ ] Establish conventions for issue labels, experiment records and evidence citations.
- [ ] Review licensing for original materials, datasets and any future MicropolisCore-derived code.

**Done when:** A new visitor can understand the project in two minutes and find its current status, evidence rules and next milestone.

## M1 — Reproducible MicropolisCore baseline

**Objective:** Understand the candidate engine before changing it.

- [ ] Identify the upstream MicropolisCore repository, commit and applicable licenses.
- [ ] Document the development environment (including Windows/WSL or Linux as appropriate).
- [ ] Obtain a complete source checkout and resolve or document any download/build issues.
- [ ] Build and run the unmodified engine, or explicitly record why it cannot yet be run.
- [ ] Record a repeatable baseline scenario, configuration and outputs.
- [ ] Identify which systems are reusable, replaceable or unsuitable for E-Cropolis.

**Done when:** A second person could follow the documented instructions and reproduce the baseline run. If the engine proves unsuitable, a documented decision to change course also constitutes useful progress.

## M2 — Monroe-area landscape evidence baseline

**Objective:** Develop a plausible environmental reference for Bert's fictional 650-acre property near Monroe, Oregon.

- [ ] Choose a study area and identify its watershed and tributary network.
- [ ] Inventory authoritative elevation, soils, climate, hydrology, floodplain, habitat and land-cover datasets.
- [ ] Include public-land/BLM boundaries as contextual research data, not as a requirement for the fictional property.
- [ ] Record each dataset's provider, date, spatial resolution, coordinate system, license and limitations.
- [ ] Define a fictional property boundary and clearly separate invented features from observed regional geography.
- [ ] Identify seasonal variability, missing data and ecological constraints relevant to modeling.

**Done when:** The environmental baseline is documented and traceable, and readers can tell which features are factual, inferred or fictional. No actual parcel is represented as available for development.

## M3 — First ecological experiment

**Objective:** Test one tractable ecological mechanism rather than attempting to model an entire settlement.

**Candidate first experiment:** Compare land-cover or soil-management scenarios and their modeled effects on seasonal runoff and infiltration within a simplified tributary catchment. **This is a proposal, not yet a validated model or chosen experiment.**

- [ ] State a falsifiable research question and competing hypotheses.
- [ ] Select a model appropriate to the available evidence and scale.
- [ ] Document assumptions, boundary conditions, input data and uncertainty.
- [ ] Implement a minimal reproducible scenario.
- [ ] Run sensitivity tests and, where feasible, compare against independent observations or published benchmarks.
- [ ] Publish results, failures and limitations without converting modeled outputs into claims of real-world improvement.

**Done when:** Inputs, code, outputs and a candid interpretation are available for independent inspection.

## M4 — Settlement decisions and consequences

**Objective:** Introduce limited human choices into the environmental model.

Candidate decisions include land-cover changes, food-growing approaches, water use, energy demand and settlement placement. For each mechanism, specify the physical process and the evidence that supports its representation.

- [ ] Define a small set of decision variables and measurable outcomes.
- [ ] Run at least two comparable scenarios under stated constraints.
- [ ] Report trade-offs, uncertainty and outcomes that contradict expectations.
- [ ] Avoid a single opaque “regeneration score”; show constituent indicators and normative weighting choices.

**Done when:** A participant can see how a decision changes modeled outcomes, why the model predicts that change, and what remains uncertain.

## M5 — Information, Data Distance and governance

**Objective:** Explore how knowledge location, information movement and decision authority affect outcomes.

- [ ] Define measurable aspects of physical, computational, representational and epistemic distance.
- [ ] Distinguish the simulated world's state from what individual agents can actually observe or infer.
- [ ] Compare local and centralized decision pathways under equivalent conditions.
- [ ] Measure useful outcomes alongside computational and communication resource costs.
- [ ] Test governance mechanisms at scales appropriate to the consequences of decisions.

**Done when:** Comparative experiments are reproducible and do not assume in advance that decentralized or centralized choices must win.

## M6 — Accessible interactive prototype

**Objective:** Make a small but credible E-Cropolis experiment understandable and playable.

- [ ] Provide an accessible interface to at least one validated or clearly caveated experimental model.
- [ ] Display data provenance, model assumptions and uncertainty alongside outcomes.
- [ ] Allow users to inspect and compare scenarios.
- [ ] Publish instructions, source, limitations and a record of known issues.
- [ ] Invite criticism, replication and suggestions for alternative models.

**Done when:** An outside participant can run a scenario, understand its limitations and trace major outputs back to the model and evidence.

## Parallel workstreams

### Narrative and public communication

The Substack story of Miguel and Bert continues alongside technical work. The fictional 650-acre property near Monroe offers a narrative setting; it is **not** evidence that a corresponding real parcel exists or is available. Story developments may inspire research questions, but do not determine scientific results.

### Evidence and provenance

For each experiment, preserve:

- **Question and hypothesis** — what is being investigated?
- **Evidence** — source, collection date, coverage, license and quality.
- **Model** — version, equations or rules, assumptions and limitations.
- **Reproduction** — code revision, parameters and execution steps.
- **Results** — outputs, uncertainty, sensitivity and unexpected findings.
- **Interpretation** — what the results support, what they do not, and what would change our view.

### Community and stewardship

Explore how collaborators can contribute without needing to read the entire story or understand the whole codebase. Contributions may include sources, ecological expertise, software tests, documentation, criticism and observations. Do not publish private information or precise locations of sensitive ecological or cultural sites without appropriate review.

## Immediate next actions

1. Finish publishing the foundation documents and link them from the existing E-Cropolis page.
2. Open a GitHub Issue for the MicropolisCore baseline, including the previously encountered source-download/build difficulties if still relevant.
3. Create the first evidence inventory for the Monroe-area watershed study.
4. Draft the epistemic-integrity specification and decision log.
5. Select **one** initial ecological question only after assessing data availability and model suitability.

## Roadmap revision policy

This roadmap is versioned and may change when new evidence, technical constraints or community insights justify a revision. Major changes should be recorded in a dated decision log with the reason and alternatives considered. Proposed milestones are not promises; a defensible decision to abandon an unsuitable approach is a legitimate result.

---

*The land comes first. The settlement must learn to belong within it.*
