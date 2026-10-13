import { describe, it, expect, vi, afterEach } from 'vitest';
import { MicropolisSimulator } from './MicropolisSimulator';

afterEach(() => {
    vi.useRealTimers();
});

describe('E-Cropolis-008: simulator time controls', () => {
    it('blocks automatic ticks but permits one deliberate step', () => {
        vi.useFakeTimers();

        const simulator = new MicropolisSimulator();
        const simTick = vi.fn();

        simulator.micropolis = {
            simPaused: false,
            simSpeedMeta: 2,
            simPasses: 4,
            heatSteps: 3,
            setSpeed: vi.fn(),
            setPasses: vi.fn(),
            simTick,
            animateTiles: vi.fn(),
        } as unknown as NonNullable<typeof simulator.micropolis>;

        simulator.setFramesPerSecond(10);
        simulator.setControlledTimeMode(true);

        expect(simulator.controlledTimeMode).toBe(true);
        expect(simulator.tickIntervalId).toBeNull();

        vi.advanceTimersByTime(1000);
        simulator.tick();
        expect(simTick).not.toHaveBeenCalled();

        simulator.stepControlledTime();
        expect(simTick).toHaveBeenCalledTimes(1);

        simulator.setFramesPerSecond(0);
    });
    it('restores native settings', () => {
        vi.useFakeTimers();
        const simulator = new MicropolisSimulator();
        const engine = {
            simPaused: false, simSpeedMeta: 2,
            simPasses: 4, heatSteps: 3,
            setSpeed: vi.fn(), setPasses: vi.fn(),
        };
        simulator.micropolis = engine as unknown as NonNullable<typeof simulator.micropolis>;
        simulator.setFramesPerSecond(10);
        simulator.setControlledTimeMode(true);
        expect(engine.setSpeed).toHaveBeenCalledWith(3);
        expect(engine.setPasses).toHaveBeenCalledWith(1);
        expect(engine.heatSteps).toBe(0);
        simulator.setControlledTimeMode(false);
        expect(engine.setSpeed).toHaveBeenLastCalledWith(2);
        expect(engine.setPasses).toHaveBeenLastCalledWith(4);
        expect(engine.heatSteps).toBe(3);
        simulator.setFramesPerSecond(0);
    });
});
