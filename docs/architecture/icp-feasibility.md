# E-Cropolis — ICP Architecture and Port Feasibility

**Version:** 0.1 — proposed architecture, not an implementation specification  
**Date:** 2026-10-23  
**Status:** Design inquiry; collaboration and technical requirements pending confirmation  
**Participants of interest:** E-Cropolis / Project Lichen, Freeos, The DAOScape  
**Target platform under investigation:** DFINITY Internet Computer Protocol (ICP)

## 1. Purpose and decision boundary

Explore an E-Cropolis use case for Freeos and The DAOScape in which a simulation engine is **separate from its graphical frontend**, with the possibility that authoritative engine state and computation run in ICP canisters.

This document **does not authorize or assume** a complete C++-to-Rust port. It proposes a testable architecture and records the unanswered questions that must determine whether such a port is justified.

E-Cropolis is an evolving research and fiction/simulation project. The proposed 650-acre estate near Monroe, Oregon, is fictional; real watersheds, soils and land-use information are empirical research inputs, not evidence of a real estate parcel.

## 2. Background and preserved baseline

Historical software lineage:

1. Original *SimCity*: simulation rules governing interacting urban systems.
2. *Micropolis*: open-source continuation of the early SimCity code lineage.
3. *MicropolisCore*: C++ simulation engine and modern interface separation.
4. *E-Cropolis*: experimental ecological inquiry and proposed regenerative-settlement simulation.
5. **Proposed ICP exploration**: network-hosted authoritative simulation state, independent graphical clients, and separately governed participation.

Existing work in the local `MicropolisCore` and `e-cropolis` repositories is a reference baseline, not a migration target to overwrite. Previous experiments address WebAssembly/browser map inspection and reproducible progression; those narrow successes are **not** proof of ecological model validity or ICP compatibility.

**Preservation rule:** Do not overwrite, reorganize, synchronize, or merge the established C++/Emscripten working tree or historical experiment branches in order to test ICP. Prototype separately.

## 3. Architectural intent

```text
      Browser / mobile / alternative visual clients
           (views, interaction, animation)
                         |
               versioned Candid API
                         |
     ICP simulation canister(s) — authoritative state
       deterministic transition rules; stable storage
                         |
           bounded interfaces / attestations
             /                         \
 Freeos + The DAOScape           personhood / identity
 governance and incentives       Decide ID (PROVISIONAL)
             \                         /
             authorized actions and participation
                         |
      curated environmental evidence and provenance
   (USGS / NRCS / PRISM / USFWS etc.; not chain truth)
```

The diagram is a **logical proposal**, not a statement that Freeos, DAOScape, Decide ID, or any ecological data pipeline is already connected.

### 3.1 Visual frontend

- Present landscapes, settlement entities, ecological indicators, proposed actions and simulation results.
- Render and animate from versioned simulation snapshots or events; no graphical frame needs to be an ICP update.
- Never become the sole authority for simulation state or governance outcomes.
- May evolve independently (2D map, 3D scene, accessibility-oriented interface, reporting client).
- Existing browser/WASM work can remain a comparison and development tool during transition.

### 3.2 Simulation engine and authoritative state

Candidate responsibilities for an ICP-hosted **Rust** engine:

- Maintain canonical simulation state and explicit model/schema version.
- Validate commands and authorization, apply deterministic state transitions, record tick and state commitments.
- Expose bounded reads/snapshots and auditable transition outcomes.
- Persist critical state safely across canister upgrades; plan schema migrations, recovery and replay.

**Open implementation choice:** Full Rust port, partial Rust port, or constrained C++/WASM canister adaptation. Rust is a practical initial candidate because the ICP Rust CDK and stable structures are directly documented; this is not evidence that all C++ code must be rewritten.

### 3.3 Freeos and DAOScape integration

Candidate functions, subject to the teams' confirmation:

- Deliberation and proposals about land use, allocation, restoration and shared infrastructure.
- Recorded collective decisions and authorization of corresponding simulation commands.
- Transparent evaluation of proposed incentives or RRI-related indicators.
- Clear distinction between a governance decision, a simulation output, and observed ecological effects.

Token issuance, monetary rewards, asset ownership and policy enforcement are **out of scope** until the partners specify the model, authority boundaries and risks.

### 3.4 Human authentication and personhood

**Decide ID is the provisional proof-of-personhood component, pending explicit Freeos/DAOScape confirmation.** Its public whitepaper describes proof-of-personhood aims; we have not verified the precise current production API, verification guarantees, costs, revocation mechanism or privacy model for this use case.

Keep distinct:

1. **Authentication:** a participant controls valid credentials.
2. **Unique personhood:** an eligible participant is attested as one human, subject to the verification scheme and its limitations.
3. **Authority:** the specific actions, votes or roles that participant is entitled to exercise.
4. **Contribution quality:** independently assessed value/evidence of contributions—not inferred from personhood.

Do not place biometrics, personal identity documents, sensitive verification material or raw environmental informant details into publicly inspectable canister state. Investigate claim-minimizing credentials, consent, unlinkability, failure paths, revocation, appeals, accessibility and non-biometric alternatives.

Internet Identity is an authentication mechanism; it should not be treated as proof of one unique human. An ICP-compatible verifiable-credential pathway is one candidate interface but **not yet confirmed as Decide ID's chosen interface**.

### 3.5 Environmental evidence

Use the existing [Experiment 015 evidence protocol](../../experiments/e-cropolis/experiment-015-monroe-environmental-evidence-inventory.md), including spatial/temporal scope and provenance. Map every model input to one of:

- **Observed:** directly supported by documented measurements or mapped sources;
- **Inferred:** derived through an explicit, reproducible method;
- **Hypothetical:** proposed intervention or parameter;
- **Simulated:** output of an identified model/version.

Consensus does not turn environmental hypotheses into physical observations. Data ingestion, trusted source verification, licensing and stale-data handling remain research tasks.

## 4. Execution and data-contract principles

- Define a small versioned **Candid** contract rather than binding frontend to internal Rust structures.
- Distinguish reads (queries), consensus-backed modifications (updates), and verifiable/certified responses where warranted.
- Prefer explicit ticks and bounded batches over a blockchain update per animation frame.
- Define ownership of clock progression, scheduler rights, idempotency and replay protection.
- Record input-state hash, engine version, authorized action, tick range and output-state hash where appropriate.
- Specify canonical encoding, random seeds, integer overflow/rounding behavior, update order and algorithm versions to make comparisons meaningful.
- Design inter-canister failure handling, including retries, duplicate commands, partial actions and `await`/reentrancy boundaries.
- Measure cycles, per-message instruction costs, latency, storage and query load before defining cadence.

### Illustrative interface concepts (NOT final Candid)

| Operation | Class | Purpose |
| --- | --- | --- |
| `get_metadata()` | Read | Engine/schema version, current tick and provenance metadata |
| `get_snapshot(version_or_tick)` | Read | Bounded view of authoritative state |
| `propose_action(action)` | Update | Submit proposal; not necessarily execute it |
| `apply_authorized_action(decision_id)` | Update | Validate governance authorization; apply at defined tick |
| `advance_ticks(count, expected_state_hash)` | Update | Controlled deterministic progression |
| `get_transition_receipt(id)` | Read | Return attributable outcome and hashes |

Public methods, argument limits and authorization mechanisms are deliberately undecided. Do not expose an unrestricted state-mutating tick function to arbitrary callers.

## 5. The C++ → Rust decision

A full port would need to reproduce, at minimum, map layout/tile semantics, simulation sequencing, random-number behavior, numerical details, zoning, utilities, traffic, finances, pollution and compatible state serialization. Translation can introduce behavioral drift even when syntax appears equivalent.

Possible approaches:

| Approach | Strength | Risk / question |
| --- | --- | --- |
| Full engine port to Rust canister | Single target implementation on ICP | High translation/test cost and possible behavioral divergence |
| Port only a deterministic simulation kernel | Small validated first step | Needs well-defined boundaries and later expansion |
| Adapt C++ to ICP-compatible Wasm | Potential reuse | Browser Emscripten imports and host expectations may be incompatible |
| Keep C++ browser/local and store governance/state commitments on ICP | Fastest architectural experiment | Does not satisfy requirement that *authoritative engine computation* execute on ICP |

**Decision gate:** Freeos and DAOScape must clarify whether the engine's rules **must** execute inside ICP consensus, or whether governance plus durable authorized state on ICP is sufficient. The current stated preference suggests an ICP-hosted engine should be investigated, but is **not yet an approved full port**.

## 6. Proposed first proof of concept (separate and reversible)

1. **Reference fixture:** Capture a small fixed map/state and one deterministic operation from the existing C++ baseline; record build, inputs, seed, expected output.
2. **New Rust project:** Reimplement only that operation, with unit and regression tests, not the entire engine.
3. **Local ICP canister:** Deploy in a local ICP development environment and exercise the operation through a Candid interface.
4. **Independent visual client:** Retrieve and render the state through a minimal frontend without embedding the authoritative rule.
5. **Identity adapter mock:** Demonstrate an authorization gate with an interface designed to accept a verified-personhood claim later; do not claim Decide ID integration at this stage.
6. **Validation:** Compare deterministic outputs and record cycles/instructions, latency, storage, replay correctness, upgrade/recovery behavior, and failure conditions.

**Success means:** a reproducible state transition performed by an ICP-hosted canister, observed through an independent frontend, with a tested authorization boundary, without changes to protected baselines.

**Failure remains useful:** document incompatibilities, cost, correctness differences and alternative architectures instead of changing the original evidence.

## 7. Unresolved decisions for Freeos / DAOScape

- Must **every** authoritative simulation tick run on ICP, or can expensive ecological models run elsewhere with results subsequently validated/committed?
- What is the first demonstrable use case: a governed land-use decision, willow biomass management, seed stewardship, or another scenario?
- Which existing Freeos/DAOScape canisters, interfaces and governance processes are available for integration?
- Is **Decide ID** confirmed? What attestations/API, revocation, privacy, fees and usability constraints apply?
- Who can advance the simulation clock, change model rules, deploy engine upgrades and resolve disputes?
- What is the intended participant scale, tick cadence, acceptable response time and operating cost?
- How are nonhuman ecological stakeholders represented without treating a human credential as ecological expertise?
- Which experimental code and evidence can be public, and what information must remain private or excluded?

## 8. Principles and references

- [E-Cropolis — Foundational Influences and Ethos v0.1](https://github.com/CFWHISPERER/e-cropolis/blob/e-cropolis-experiments-archive/experiments/e-cropolis/foundations/influences.md)
- [E-Cropolis epistemic integrity](../principles/epistemic-integrity.md)
- [Research bibliography](../research/bibliography.md)
- [ICP canister concepts](https://docs.internetcomputer.org/concepts/canisters/)
- [ICP Rust CDK](https://docs.internetcomputer.org/languages/rust/)
- [ICP Candid interface](https://docs.internetcomputer.org/guides/canister-calls/candid/)
- [ICP inter-canister calls](https://docs.internetcomputer.org/guides/canister-calls/inter-canister-calls/)
- [ICP timers](https://docs.internetcomputer.org/concepts/timers/)
- [ICP verifiable credentials](https://docs.internetcomputer.org/guides/authentication/verifiable-credentials/)
- [DecideAI whitepaper (Decide ID description)](https://decideai.gitbook.io/decideai-whitepaper)

## 9. Current status

**Documented:** architectural options, preliminary component responsibilities, personhood placeholder, implementation constraints, preservation rules and first feasibility test.

**Not performed:** no code port, no ICP canister deployment, no Decide ID integration, no Freeos/DAOScape API integration, no ecological validation, no local repository modifications.

**Next:** circulate this draft to the Freeos team, resolve the authoritative-execution and identity-interface questions, then consider an explicitly scoped separate proof-of-concept experiment.
