import { describe, it, expect } from 'vitest';
import { loadMicropolisMainModule } from './wasm/node';
import { createMapMopViews } from './wasm/views';
import { micropolisReactive } from './MicropolisReactive.svelte';

describe('E-Cropolis-008: controlled simulation time', () => {
    it('advances exactly 16 phases through 16 explicit ticks', async () => {
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

            const startingPhase = city.phaseCycle;
            const startingLoops = city.simLoops;

            for (let i = 0; i < 16; i++) {
                city.simTick();
                expect(city.phaseCycle).toBe((startingPhase + i + 1) & 15);
            }

            expect(city.phaseCycle).toBe(startingPhase);
            expect(city.simLoops - startingLoops).toBe(16);
        } finally {
            city.delete();
            // Micropolis owns and destroys its registered callback.
        }
    });
});
