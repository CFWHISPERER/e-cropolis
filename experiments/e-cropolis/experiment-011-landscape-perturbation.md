# E-Cropolis — Experiment 011
## Controlled Landscape Perturbation

### Purpose

Investigate whether a single controlled landscape change produces
detectable differences in subsequent Micropolis simulation evolution.

This experiment builds upon the reproducibility established by
Experiment 010.

### Experimental configuration

- Deterministic seed: 20261011
- Initial city: Haight
- Independent native engine instances: 2
- Control: City A, unchanged
- Intervention: City B, dirt replaced with woods
- Intervention coordinate: (7, 10)
- Original tile value: 0
- Intervention tile value: 12325
- Simulation ticks: 32
- Map dimensions: 120 × 100
- Total map tiles: 12,000

Both engines used identical initialization and simulation controls.

### Observed results

The intervention initially produced exactly one differing map tile.

Across all 32 synchronized simulation ticks:

- City A retained dirt at coordinate (7, 10).
- City B retained woods at coordinate (7, 10).
- Exactly one map tile differed between the engines.
- No additional map differences were detected.
- Eight selected simulation-state variables remained identical.

The compared variables were phaseCycle, simCycle, simLoops,
cityTime, cityScore, resPop, comPop, and indPop.

Both engines completed two 16-phase simulation cycles.

City score remained 758 in both engines throughout the experiment.

All test assertions passed.

### Interpretation

A controlled dirt-to-woods substitution persisted throughout
the observation period without producing additional map differences
or detectable divergence in the selected simulation variables.

This establishes a baseline for investigating how landscape
interventions propagate through the existing simulation.

### Scientific limitations

These findings apply only to the tested configuration, location,
seed, and observation period.

The experiment does not exclude differences in unmeasured engine
variables or effects that might emerge over longer periods.

It does not measure soil health, biodiversity, water retention,
nutrient cycling, biological succession, or regenerative capability.

A woods tile represents woodland graphically and computationally;
it does not constitute a living ecological system.

No conclusion about the ecological value of woodland follows
from the absence of measured simulation divergence.

### Reproduction

The experimental test source is:

`apps/micropolis/src/lib/ECropolisLandscapePerturbation.test.ts`

From the Micropolis application directory, run:

    ./node_modules/.bin/vitest run src/lib/ECropolisLandscapePerturbation.test.ts

If the experimental native engine needs rebuilding, follow
the build and module preparation instructions in
`experiment-010-reproduction.md`.

Do not run `make install` or `make clean`.

### Preservation and provenance

Experiment 011 extends Experiment 010's deterministic
experimental method.

The protected undeveloped landscape snapshot remains unchanged:

`experiments/e-cropolis/snapshots/e-cropolis-undeveloped-seed-20261011.json`

Generated engine artifacts are distinct from experimental source code.

### Future investigations

Potential extensions include longer observation periods,
different intervention coordinates, multiple woodland tiles,
additional engine measurements, and explicit models of
ecological processes and regenerative capability.
