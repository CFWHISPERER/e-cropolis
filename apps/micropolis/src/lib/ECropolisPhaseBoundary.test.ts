import { describe, it, expect } from 'vitest';
import { loadMicropolisMainModule } from './wasm/node';
import { createMapMopViews } from './wasm/views';
import { micropolisReactive } from './MicropolisReactive.svelte';

describe('E-Cropolis-009: native phase boundary', () => {
    it('increments simCycle when phase 0 executes, not when phase 15 wraps', async () => {
        const engine = await loadMicropolisMainModule();
        const city = new engine.Micropolis();
        const callback = new engine.JSCallback(micropolisReactive.engineCallback);

        try {
            city.setCallback(callback, {});
            createMapMopViews(engine, city);
            city.init();
            city.loadCity('/cities/haight.cty');

            city.simSpeed = 3;
            city.simPasses = 1;
            city.heatSteps = 0;

            // Advance explicitly until the next phase is 15.
            for (let i = 0; i < 16 && city.phaseCycle !== 15; i++) {
                city.simTick();
            }

            expect(city.phaseCycle).toBe(15);

            const cycleBeforeWrap = city.simCycle;

            // Execute phase 15; the next phase becomes 0.
            city.simTick();

            expect(city.phaseCycle).toBe(0);
            expect(city.simCycle).toBe(cycleBeforeWrap);

            // Execute phase 0; the next phase becomes 1.
            city.simTick();

            expect(city.phaseCycle).toBe(1);
            expect(city.simCycle).toBe((cycleBeforeWrap + 1) % 1024);
        } finally {
            city.delete();
            // Micropolis owns and destroys its registered callback.
        }
    });
});
