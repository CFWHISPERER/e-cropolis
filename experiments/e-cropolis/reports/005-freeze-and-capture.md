# E-Cropolis Experiment 005 — Freeze and Capture

**Date:** 12 October 2026
**Status:** Snapshot structure validated
**Implementation commit:** `74ee901`

## Objective

Establish explicit controls for freezing the working Micropolis
simulation and capturing its landscape without modifying the
preserved undeveloped baseline.

## Method

Two separate browser commands were implemented:

1. `freezeECropolisWorkingLandscape()`
2. `captureECropolisWorkingLandscape()`

The freeze function requests a native simulation pause and
JavaScript-level pause, then verifies three conditions:

- `simulator.paused === true`
- `simulator.micropolis.simPaused === true`
- `simulator.micropolis.simSpeed === 0`
## Capture Procedure

The capture function refuses to proceed unless both the
JavaScript and native simulation pause flags are set.

It then:

1. Refreshes the map view from WebAssembly memory.
2. Creates an independent copy of the landscape tile array.
3. Records metadata identifying the working landscape.
4. Downloads a timestamped JSON snapshot.

Freezing and capturing are deliberately separate operations.

## Preserved Evidence

Snapshot:
`snapshots/e-cropolis-working-1791774580910.json`

Recorded metadata:

- Schema: `e-cropolis-landscape-snapshot-v1`
- Dimensions: 120 x 100
- Layout: column-major
- Tile-ID mask: `0x03ff`
- Recorded source commit: `2bfe12a`
- Captured: `2026-10-12T03:09:40.910Z`
- Landscape: `working`
- Experiment: `E-Cropolis-005`

The freeze-and-capture implementation was committed
separately as `74ee901`.

## Validation Results

The archived JSON snapshot was parsed using Python.

| Measurement | Result |
|---|---:|
| Expected tile count | 12,000 |
| Recorded tile count | 12,000 |
| Dimension/count consistency | PASS |

The snapshot contains the expected number of tile values
for a 120 x 100 Micropolis landscape.

## Interpretation

Experiment 005 implements explicit controls for requesting
a frozen working simulation and capturing its landscape.

The archived snapshot is structurally consistent with
the recorded map dimensions.

The working landscape is distinct from the preserved
undeveloped baseline generated using seed `20261011`.

## Limitations

The implementation checks simulation pause states, but
the evidence examined does not independently establish
that every simulation process stopped during capture.

Validation confirms JSON readability and tile-count
consistency, not the correctness of every tile value.

The snapshot preserves map tiles and metadata, not a
complete simulation state or ecological model.

The recorded source commit and implementation commit
are separate provenance references.

## Relevance to E-Cropolis

Controlled landscape capture provides a foundation for
comparing working simulation states against a preserved
baseline.

Future experiments can investigate deliberate interventions
while distinguishing measurable changes in simulation
representation from ecological consequences.

## Guiding Question

What might people build here if they began by asking
what was already here?
