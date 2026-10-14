# E-Cropolis Experiment 008
## Controlled Simulation Time: Explicit Advancement of the Micropolis Clock

**Status:** Implemented and tested
**Verification date:** 2026-10-14
**Test framework:** Vitest 2.1.9
**Test results:** 3 passed, 0 failed
**Repository:** CFWHISPERER/e-cropolis
**Archive branch:** e-cropolis-experiments-archive

---

## 1. Purpose

Experiment 008 investigates whether Micropolis simulation time can
be advanced deliberately, rather than continuously through an
automatic application timer.

The objective is to establish a controlled experimental clock
that allows future E-Cropolis investigations to distinguish
deliberate interventions from subsequent simulation activity.

This experiment builds upon earlier work:

- Experiment 003: Fixed-seed landscape reproducibility.
- Experiment 004: Landscape comparison methodology.
- Experiment 005: Simulation freeze and snapshot capture.
- Experiment 006: Single-tile woodland intervention.
- Experiment 007: Native woodland verification.

Together, these experiments establish the beginnings of a
reproducible experimental environment.

## 2. Experimental Scope

Experiment 008 addresses three related capabilities:

1. Native simulation clock advancement through explicit ticks.
2. Suppression of automatic ticks during controlled-time mode.
3. Browser commands for enabling, stepping, and disabling
   controlled-time execution.

The experiment tests control over the progression of simulation
time. It does not establish reproducibility of the complete
simulation state or demonstrate ecological outcomes.

In particular, Micropolis tile categories are simulation
representations, not direct measurements of living ecosystems.

The preserved undeveloped landscape remains the reference
baseline and is not modified by this experiment.

## 3. Native Simulation Clock Verification

The first component of Experiment 008 verifies the native
Micropolis engine's 16-phase simulation cycle.

Test file:
apps/micropolis/src/lib/ECropolisControlledTime.test.ts

Implementation commit:
f115bd3 - verify deterministic 16-phase simulation cycle

The test creates a native Micropolis instance through WebAssembly,
loads the existing Haight city, and configures:

- simSpeed = 3
- simPasses = 1
- heatSteps = 0

It records the initial phaseCycle and simLoops values, then
executes 16 explicit calls to simTick().

After each tick, the test asserts:

    phaseCycle == (startingPhase + i + 1) & 15

This checks progression through the 16-phase cycle, including
wraparound from phase 15 to phase 0.

After 16 ticks, the test additionally verifies:

- phaseCycle equals its starting value.
- simLoops has increased by exactly 16.

The test passed on 2026-10-14.

This demonstrates predictable advancement of the tested native
clock counters under the specified configuration. It does not
establish reproducibility of all native simulation state.

## 4. Controlled-Time Simulator Implementation

Implementation commit:
8240efa - add deterministic simulation time controls

Primary implementation:
apps/micropolis/src/lib/MicropolisSimulator.ts

The simulator introduces a controlledTimeMode flag and retains
the original native speed, passes, and heat-step settings.

When controlled-time mode is enabled:

- Automatic application timer advancement is disabled.
- Ordinary tick() calls are prevented from advancing the engine.
- Native simulation speed is set to 3.
- Simulation passes are set to 1.
- Heat steps are set to 0.
- Changes to the paused state are blocked.

The stepControlledTime() method invokes native simTick()
exactly once per permitted call and requests view rendering.

Unlike ordinary tick(), this method does not call animateTiles().
Simulation advancement and visual animation must therefore be
distinguished when interpreting observations.

When controlled-time mode is disabled, the previously saved
native speed, passes, and heat-step settings are restored.

Controlled-time activation is rejected when the native engine
is paused, and explicit stepping is unavailable unless
controlled-time mode is enabled.

Test file:
apps/micropolis/src/lib/ECropolisSimulatorControls.test.ts

The two simulator-control tests use mocked engine methods and
fake timers to verify:

1. Automatic ticking is suppressed while one deliberate step
   invokes simTick() exactly once.
2. Native speed, passes, and heat-step settings are restored
   after controlled-time mode is disabled.

Both tests passed on 2026-10-14.

These tests validate the simulator's tested control behavior,
but do not independently prove complete native-engine
determinism or reproducible landscape evolution.

## 5. Browser-Controlled Simulation Time

Implementation commit:
af27839 - add browser controlled-time commands

Primary implementation:
apps/micropolis/src/lib/MicropolisView.svelte

Three commands were made available through the browser console:

    enableECropolisControlledTime()
    stepECropolisControlledTime()
    disableECropolisControlledTime()

The first enables controlled-time mode. The second requests
one explicit native simulation tick. The third disables
controlled-time mode and restores saved native settings.

Registering these commands does not itself change the
simulation state.

The step command refuses to proceed unless controlled-time
mode is enabled.

When the Svelte view is destroyed, the commands are removed
from the browser window to avoid retaining obsolete references.

### Browser observation

During earlier browser testing, the simulation was observed
at phase 5, cycle 94.

After 12 requested controlled steps, it was observed at
phase 1, cycle 95.

This is consistent with a 16-phase clock:

    (5 + 12) mod 16 = 1

The observation supports correct phase wraparound and cycle
advancement during that session.

It is not a complete execution trace, independent reproduction,
or proof of deterministic landscape evolution.

## 6. Test Execution and Results

Verification date: 2026-10-14

Test environment:
- Micropolis application under WSL Ubuntu
- Existing project installation of Vitest 2.1.9
- Native Micropolis engine accessed through WebAssembly
- Mocked engine methods and fake timers for simulator controls

Command executed from apps/micropolis:

    ./node_modules/.bin/vitest run \
      src/lib/ECropolisControlledTime.test.ts \
      src/lib/ECropolisSimulatorControls.test.ts

Recorded results:

    Test Files  2 passed (2)
         Tests  3 passed (3)
      Duration  893ms

The native clock test and both simulator-control tests passed.

The results establish that the specified assertions succeeded
in the tested environment. They do not establish exhaustive
correctness of the simulation engine.

## 7. Limitations and Outstanding Questions

Experiment 008 establishes explicit control over tested
simulation-clock advancement, subject to several limitations.

- Complete native simulation state was not captured and compared.
- Identical outcomes across independent runs were not established.
- The browser observation was not independently repeated here.
- The simulator-control tests use mocked native engine methods.
- The native clock test loads Haight city rather than the
  preserved undeveloped E-Cropolis landscape.
- The experiment does not establish that all sources of
  randomness, callbacks, or asynchronous behavior are controlled.
- Visual rendering and tile animation are not equivalent to
  native simulation advancement.
- No ecological effects or regenerative capabilities were measured.

Further experiments should examine whether identical initial
states, interventions, settings, and explicit tick sequences
produce identical resulting simulation states.

The experimental record should preserve sufficient information
to distinguish observed behavior from inferred behavior.

## 8. Conclusion

Experiment 008 successfully implemented and tested a mechanism
for explicit advancement of Micropolis simulation time.

Three automated tests passed, covering native clock progression,
suppression of automatic ticking, deliberate stepping, and
restoration of saved engine settings.

Browser commands provide an accessible means of operating the
controlled-time mechanism during interactive experiments.

The achievement is methodological: E-Cropolis now has a tested
instrument for controlling when its simulation clock advances.

This does not yet demonstrate reproducible ecological outcomes
or validate Micropolis as an ecological model.

The next challenge is to connect controlled simulation time
with reproducible initial conditions, interventions, complete
state capture, and carefully bounded comparisons.

The guiding question remains:

"What might people build here if they began by asking
what was already here?"

Controlled time offers a way to investigate what changes after
an intervention, without confusing the passage of simulated
time with the intervention itself.

