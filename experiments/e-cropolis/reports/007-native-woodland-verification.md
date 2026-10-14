# E-Cropolis Experiment 007 — Native Single-Tile Woodland Verification

**Date:** 12 October 2026  
**Status:** Saved landscape verified; native-memory capture pathway inspected  
**Commit:** `e330b9a`  
**Working snapshot:** `e-cropolis-working-1791826750506.json`

## 1. Objective

Determine whether a working-landscape snapshot obtained through the Micropolis WebAssembly map-view mechanism preserves the single-tile woodland intervention recorded in Experiment 006.

The experiment extends the earlier work in two distinct ways:

- Experiment 006 established a precisely localized change in the saved landscape representation.
- Experiment 007 examines a subsequent working-landscape capture and the native-memory pathway used to obtain its tile data.

The objective is to establish consistency between the recorded intervention and the later working snapshot, without assuming that identical tile data demonstrates ecological change or complete simulation-state reproducibility.

## 2. Experimental artifacts

The preserved undeveloped baseline is:

`experiments/e-cropolis/snapshots/e-cropolis-undeveloped-seed-20261011.json`

The Experiment 006 intervention snapshot is:

`experiments/e-cropolis/snapshots/e-cropolis-006-single-tree.json`

The Experiment 007 working snapshot is:

`experiments/e-cropolis/snapshots/e-cropolis-working-1791826750506.json`

The working snapshot was added in Git commit `e330b9a`, dated 12 October 2026.

Its recorded metadata includes:

| Field | Recorded value |
|---|---|
| Schema | `e-cropolis-landscape-snapshot-v1` |
| Dimensions | 120 × 100 |
| Layout | `column-major` |
| Tile mask | `0x03ff` |
| Source commit | `2bfe12a` |
| Captured at | `2026-10-12T17:39:10.505Z` |
| Landscape | `working` |
| Experiment identifier | `E-Cropolis-005` |

The experiment identifier reflects the existing working-landscape capture mechanism. It is not evidence that the snapshot was originally labeled Experiment 007.

## 3. Quantitative verification

All comparisons used the existing `experiments/e-cropolis/tools/compare-landscapes.py` utility.

Comparing the preserved undeveloped baseline against the Experiment 007 working snapshot produced:

| Measurement | Result |
|---|---:|
| Total tiles | 12,000 |
| Changed raw tile positions | 1 |
| Changed tile identifiers | 1 |
| Changed landscape categories | 1 |
| Raw change percentage | 0.0083% |
| Changed array index | 5750 |
| Category transition | `bare_ground` → `woodland` |

With column-major storage and a height of 100 tiles, array index `5750` corresponds to coordinates `(57, 50)`.

The recorded baseline value at that position was `0`, while the intervention value was `37`. The masked tile identifiers were likewise `0` and `37`.

A direct comparison between the Experiment 006 intervention snapshot and the Experiment 007 working snapshot found:

- Zero changed raw tile positions.
- Zero changed tile identifiers.
- Zero changed landscape categories.
- Identical raw tile values at all 12,000 positions.

Thus, the two saved landscape tile arrays agree completely. This finding does not imply that all other simulation state was identical.

## 4. Native WebAssembly memory pathway

Inspection of the source code identified the following capture pathway:

1. The working-landscape capture function in `apps/micropolis/src/lib/MicropolisView.svelte` calls `simulator.syncMapViews()`.
2. The `syncMapViews()` method in `MicropolisSimulator.ts` calls `createMapMopViews(...)` and assigns its returned `mapData` view.
3. The `createMapMopViews()` implementation in `apps/micropolis/src/lib/wasm/views.ts` obtains a 16-bit view of the Emscripten heap using `heapU16FromEmscriptenModule(engine)`.
4. It obtains the native map address and size using `micropolis.getMapAddress()` and `micropolis.getMapSize()`.
5. It constructs `mapData` using `heapU16.subarray(...)` over the corresponding memory region.
6. The capture function passes `simulator.mapData` to `createLandscapeSnapshot()` and downloads the resulting JSON file.

This code establishes a pathway from the native Micropolis WebAssembly map-memory region to the saved landscape representation.

The inspected implementation supports the provenance of the capture mechanism. It does not, by itself, reconstruct the original browser execution session or independently verify every operation performed during that session.

## 5. Interpretation

Experiment 007 provides two complementary forms of evidence.

First, the working-landscape snapshot contains exactly the same 12,000 raw tile values as the Experiment 006 intervention snapshot. Both differ from the preserved undeveloped baseline at precisely one position: index `5750`, corresponding to coordinates `(57, 50)`.

Second, inspection of the Micropolis source code establishes that the working-landscape capture mechanism obtains its map view through the native WebAssembly memory region.

Together, these findings support the consistency of the recorded woodland intervention across the two saved snapshots and establish the memory pathway used by the capture mechanism.

They do not demonstrate that the entire simulation state was identical or that an ecological process occurred.

## 6. Limitations and epistemic boundaries

The following qualifications remain important:

- Identical landscape tile arrays do not establish identical simulation clocks, random-number generator states, internal counters, or other engine state.
- Source-code inspection establishes the intended capture pathway but does not independently reconstruct the original browser execution session.
- The snapshot metadata retains the identifier `E-Cropolis-005`, reflecting the reused capture mechanism rather than an explicit Experiment 007 label.
- A woodland tile represents a simulation classification, not direct evidence of a living tree or its ecological capabilities.
- No biological growth, survival, reproduction, soil improvement, biodiversity response, or regenerative outcome was measured.
- The experiment does not establish how the intervention behaves over subsequent simulation cycles.

These limitations define what the evidence can support and identify requirements for future experiments.

## 7. Relationship to subsequent experiments

Experiments 008 and 009 investigate controlled simulation time and reproducibility of the simulation clock.

Those capabilities are relevant because repeated observations require a clear distinction between changes introduced deliberately and changes produced during simulation advancement.

A future experiment could combine a preserved baseline, a precisely recorded intervention, controlled simulation steps, and repeated state captures to investigate whether simulated consequences can be attributed to that intervention.

Such investigations should define their outcome measures in advance and distinguish simulated indicators from validated ecological measurements.

## 8. Relevance to E-Cropolis and Project Lichen

Experiment 007 strengthens the methodological foundation of E-Cropolis by connecting a reproducible landscape comparison to an identifiable native-engine memory pathway.

For Project Lichen, this illustrates the importance of epistemic integrity: confidence should follow the available evidence, and the boundaries of that evidence should remain visible.

A faithful representation of a woodland tile is useful, but it must not be confused with demonstrated ecological capability.

The longer-term aim is to investigate how interventions affect the persistence, relationships, and regenerative potential of living systems. The present experiment establishes only an early technical prerequisite for such inquiries.

## 9. Conclusion

Experiment 007 verified that a later working-landscape snapshot contains exactly the same 12,000 raw tile values as the Experiment 006 intervention snapshot.

Source-code inspection also established that the working-landscape capture mechanism reads through a view of the native Micropolis WebAssembly map-memory region.

These findings support the consistency and traceability of the recorded single-tile woodland intervention, while leaving complete engine-state reproducibility and ecological outcomes unproven.

**Guiding question:** How can reproducible observations of a simulated landscape help us investigate the consequences of interventions without mistaking the simulation's representations for the capabilities of living systems?

