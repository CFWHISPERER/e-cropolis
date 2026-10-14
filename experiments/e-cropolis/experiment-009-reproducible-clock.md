# E-Cropolis Experiment 009 — The Reproducible Clock

**Date:** 2026-10-14

## Objective
Verify deliberate single-phase stepping and the relationship between native `phaseCycle` and `simCycle`.

## Method
In Edge DevTools, controlled time was enabled with `window.enableECropolisControlledTime()`. The logged `MicropolisSimulator` object was stored as `temp1`. Each step used `window.stepECropolisControlledTime()` and was followed by reading `temp1.micropolis.phaseCycle` and `temp1.micropolis.simCycle`.

## Observations

| Step | phaseCycle | simCycle |
|---:|---:|---:|
| 0 | 5 | 94 |
| 1 | 6 | 94 |
| 2 | 7 | 94 |
| 3 | 8 | 94 |
| 4 | 9 | 94 |
| 5 | 10 | 94 |
| 6 | 11 | 94 |
| 7 | 12 | 94 |
| 8 | 13 | 94 |
| 9 | 14 | 94 |
| 10 | 15 | 94 |
| 11 | 0 | 94 |
| 12 | 1 | 95 |

## Findings
Twelve consecutive explicit steps advanced `phaseCycle` by one each time. The counter wrapped from 15 to 0 without incrementing `simCycle`; the next step, executing phase 0, incremented `simCycle` from 94 to 95.

Experiment 008 separately observed phase 6 → 7 and a stationary phase 7 after approximately 20 seconds without stepping.

## Limits
These are manual browser-console measurements, not automated replay or ecological validation. One boundary was observed. The developed Haight city was displayed; the preserved undeveloped E-Cropolis landscape was not loaded or altered. Browser pause-protection warnings did not prevent the observed steps.

## Next
Automate a phase-boundary regression test; capture structured traces; test reproducibility from a fixed saved state before ecological interventions.
