
<script lang="ts">

  import { onMount, onDestroy } from 'svelte';
  import { inventoryLandscape } from './landscape-inventory.mjs';
  import {
    createLandscapeSnapshot,
    downloadLandscapeSnapshot
  } from './landscape-snapshot.mjs';
  import { getSharedSimulator, releaseSharedSimulator, MicropolisSimulator } from '$lib/MicropolisSimulator';
  import { micropolisReactive } from '$lib/MicropolisReactive.svelte';
  import TileView from '$lib/TileView.svelte';
  import GameHud from '$lib/GameHud.svelte';
  import HelpModal from '$lib/HelpModal.svelte';
  import Toolbar from '$lib/Toolbar.svelte';
  import MessageOverlay from '$lib/MessageOverlay.svelte';
  import ZoneStatusPanel from '$lib/ZoneStatusPanel.svelte';
  import BudgetModal from '$lib/BudgetModal.svelte';
  import SoftwareSpriteLayer from '$lib/sprites/SoftwareSpriteLayer.svelte';
  import { triggerSkywriting, toggleSkywritingPilot } from '$lib/sprites/plugins/skywriting/SkywritingPlugin.svelte';
  import CursorLayer from '$lib/input/CursorLayer.svelte';
  import { tileFootprintScreenRect } from '$lib/input/viewportTileFrame';
  import { toolState } from '$lib/ToolState.svelte';
  import { toolFootprintAtCenter } from '$lib/gameTools';
  import type { CursorPresence } from '$lib/input/types';
  import type { ScreenRect } from '$lib/input/viewportTileFrame';

  let micropolisSimulator: MicropolisSimulator | null = null;
  let tileView: TileView | null = null;
  let viewRenderRef: (() => void) | null = null;

  function getMapViewport() {
    return tileView?.getMapViewport() ?? null;
  }

  const localPlayerId = 'local';

  const localCursorPresence = $derived.by((): CursorPresence[] => {
    void toolState.toolRevision;
    void toolState.hoverRevision;
    const tile = toolState.hoverTile;
    const toolId = toolState.activeToolId;
    if (!tile) return [];
    const footprint = toolFootprintAtCenter(tile[0], tile[1], toolId);
    return [{
      playerId: localPlayerId,
      local: true,
      toolId,
      anchorSpace: 'world-tile',
      visible: true,
      tile: footprint,
      rimPolicy: 'fat',
      representations: { dom: [] }
    }];
  });

  const domFrameRects = $derived.by((): Record<string, ScreenRect> => {
    void micropolisReactive.mapCameraRevision;
    void toolState.toolRevision;
    void toolState.hoverRevision;
    const tile = toolState.hoverTile;
    const toolId = toolState.activeToolId;
    const vp = tileView?.getMapViewport?.();
    if (!tile || !vp || vp.screenWidth <= 0 || vp.screenHeight <= 0) return {};
    const footprint = toolFootprintAtCenter(tile[0], tile[1], toolId);
    const rect = tileFootprintScreenRect(vp, footprint.x, footprint.y, footprint.w, footprint.h);
    if (rect.w <= 0 || rect.h <= 0) return {};
    return { [localPlayerId]: rect };
  });

  onMount(async () => {

    console.log("MicropolisView: onMount: initializing micropolisengine...");

    viewRenderRef = () => { tileView?.render?.(); };
    micropolisSimulator = await getSharedSimulator(micropolisReactive.engineCallback, viewRenderRef);
    micropolisReactive.attach(micropolisSimulator);

  // E-Cropolis 003: Verify fixed-seed generator availability.
  // Diagnostic only — does not generate or change terrain.
   console.log(
     'E-Cropolis 003: Fixed-seed generator available:',
     typeof micropolisSimulator.micropolis?.generateSomeCity === 'function'
 ); 

// E-Cropolis 003: Explicitly triggered terrain generation.
// Does not run automatically.
async function generateECropolisLandscape(seed = 20261011) {
  const simulator = micropolisSimulator;

  if (!simulator?.micropolis) {
    console.error('E-Cropolis 003: Simulator unavailable');
    return;
  }

  if (!window.confirm(
    `Replace the current city with E-Cropolis terrain seed ${seed}?`
  )) {
    return;
  }

  // Stop the simulation before generating terrain.
  simulator.setPaused(true);

  // Generate the landscape through the C++ WebAssembly engine.
  simulator.micropolis.generateSomeCity(seed);

  if (!simulator.syncMapViews() || !simulator.mapData) {
    console.error('E-Cropolis 003: Map data unavailable');
    return;
  }

  const inventory = inventoryLandscape(simulator.mapData);

  const snapshot = createLandscapeSnapshot(
    simulator.mapData,
    {
      landscape: 'undeveloped',
      seed: String(seed)
    }
  );

  console.log('E-Cropolis 003: Landscape generated', seed);
  console.table(inventory.categories);
  console.log('E-Cropolis 003: Full inventory', inventory);

  downloadLandscapeSnapshot(
    snapshot,
    `e-cropolis-undeveloped-seed-${seed}.json`
  );

  // Leave the simulation paused.
}

 // E-Cropolis 003: Browser command, registered without executing it.
  (window as typeof window & {
  generateECropolisLandscape?: (seed?: number) => Promise<void>;
}).generateECropolisLandscape = generateECropolisLandscape;

console.log('E-Cropolis 003: Browser command registered');

// E-Cropolis 005: Capture the current working landscape.
// Read-only operation; requires a paused simulation.
function captureECropolisWorkingLandscape() {
  const simulator = micropolisSimulator;

  if (!simulator?.micropolis) {
    console.error('E-Cropolis 005: Simulator unavailable');
    return;
  }

  if (!simulator.paused || !simulator.micropolis.simPaused) {
    console.warn('E-Cropolis 005: Capture refused; pause state:', {
  paused: simulator.paused,
  simPaused: simulator.micropolis.simPaused,
  simSpeed: simulator.micropolis.simSpeed
});
    return;
  }  

  // Refresh the view into WebAssembly memory.
  if (!simulator.syncMapViews() || !simulator.mapData) {
    console.error('E-Cropolis 005: Map data unavailable');
    return;
  }

  // Create an independent copy of the current landscape.
  const snapshot = createLandscapeSnapshot(
    simulator.mapData,
    {
      landscape: 'working',
      experiment: 'E-Cropolis-005'
    }
  );

  console.log(
    'E-Cropolis 005: Working landscape captured',
    snapshot.capturedAt,
    snapshot.tiles.length,
    'tiles'
  );

  // Download the working landscape snapshot.
  downloadLandscapeSnapshot(
    snapshot,
    `e-cropolis-working-${Date.now()}.json`
  );
}

// Register the browser command without executing it.
(window as typeof window & {
  captureECropolisWorkingLandscape?: () => void;
}).captureECropolisWorkingLandscape =
  captureECropolisWorkingLandscape;

console.log('E-Cropolis 005: Working capture command registered');

// E-Cropolis 005: Explicitly freeze the working simulation.
// Freezing and capturing remain separate operations.
function freezeECropolisWorkingLandscape() {
  const simulator = micropolisSimulator;

  if (!simulator?.micropolis) {
    console.error('E-Cropolis 005: Simulator unavailable');
    return;
  }

    // Recover a partially paused engine if necessary.
  if (simulator.micropolis.simPaused &&
      simulator.micropolis.simSpeed !== 0) {
    simulator.micropolis.setSpeed(0);
  }

  // Pause the native engine before stopping the JS timer.
  simulator.micropolis.pause();
  simulator.setPaused(true);

  // Verify that both pause states agree.
  const frozen =
    simulator.paused === true &&
    simulator.micropolis.simPaused === true &&
    simulator.micropolis.simSpeed === 0;

  if (!frozen) {
    console.error(
      'E-Cropolis 005: Freeze verification failed',
      {
        paused: simulator.paused,
        simPaused: simulator.micropolis.simPaused,
        simSpeed: simulator.micropolis.simSpeed
      }
    );
    return;
  }

  console.log('E-Cropolis 005: Freeze verified', {
    paused: simulator.paused,
    simPaused: simulator.micropolis.simPaused,
    simSpeed: simulator.micropolis.simSpeed
  });
}

// Register the explicit freeze command.
(window as typeof window & {
  freezeECropolisWorkingLandscape?: () => void;
}).freezeECropolisWorkingLandscape =
  freezeECropolisWorkingLandscape;

console.log('E-Cropolis 005: Freeze command registered');

   // Pause sim ticks until tile atlas is loaded — avoids render-before-ready race.
   micropolisSimulator.setPaused(true);
   micropolisSimulator.syncMapViews();
   await tileView!.initialize(micropolisSimulator);

   // E-Cropolis Experiment 001: read-only landscape inventory.
   try {
   if (!micropolisSimulator.syncMapViews() || !micropolisSimulator.mapData) {
      console.warn('E-Cropolis 001: map data unavailable');
     } else {
      const inventory = inventoryLandscape(micropolisSimulator.mapData);

    console.log('E-Cropolis 001: Landscape Inventory');
    console.table(inventory.categories);
    console.log('E-Cropolis 001: Full report', inventory);
    const snapshot = createLandscapeSnapshot(
      micropolisSimulator.mapData,
      { landscape: 'developed-city' }
    );

    console.log(
      'E-Cropolis 002: Snapshot prepared',
      snapshot.schema,
      snapshot.tiles.length,
      'tiles'
    );

    (window as typeof window & {
      downloadECropolisSnapshot?: () => void
    }).downloadECropolisSnapshot = () => {
      downloadLandscapeSnapshot(
        snapshot,
        'e-cropolis-developed-city.json'
      );
    };
console.table(
  Object.entries(inventory.tileIds)
    .map(([id, count]) => ({ tileId: Number(id), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
);
  }
  } catch (error) {
  console.error('E-Cropolis 001: Inventory failed', error);
  } finally {
  micropolisSimulator.setPaused(false);
  }

    console.log("MicropolisView: onMount:", "micropolisSimulator:", micropolisSimulator);

    if (typeof window !== 'undefined') {
      const w = window as unknown as {
        micropolisSkywrite?: typeof triggerSkywriting;
        micropolisSkyPilot?: () => boolean;
      };
      w.micropolisSkywrite = triggerSkywriting;
      w.micropolisSkyPilot = toggleSkywritingPilot;
    }
  });

  onDestroy(() => {
    console.log('MicropolisView: onDestroy');
    micropolisReactive.registerMapPan(null);
    micropolisReactive.detach();
    releaseSharedSimulator(viewRenderRef || undefined);
  });

</script>

<div class="view-container">
  <Toolbar />
  <div class="play-main">
    <div class="map-stack">
      <TileView bind:this={tileView} />
      <SoftwareSpriteLayer getViewport={getMapViewport} simulator={micropolisSimulator} />
      <CursorLayer
        backend="dom"
        presences={localCursorPresence}
        domFrameRects={domFrameRects}
      />
      <GameHud />
      <ZoneStatusPanel />
      <BudgetModal />
      <HelpModal />
    </div>

    <MessageOverlay />
  </div>
</div>

<style>

.view-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  --message-bar-height: 2.5rem;
}

.play-main {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-stack {
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow: hidden;
}

</style>
