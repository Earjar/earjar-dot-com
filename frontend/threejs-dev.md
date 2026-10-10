# Three.js Development Guide

How the 3D synth showcase on the landing page is set up, and how to work on it.

## Stack

| Package | Version | Role |
| --- | --- | --- |
| `three` | ^0.186 | The 3D engine |
| `@react-three/fiber` (R3F) | ^9 | React renderer for Three.js (v9 is the line that supports React 19) |
| `@react-three/drei` | ^10 | Helpers: `View`, `useGLTF`, `Environment`, `ContactShadows`, ... |
| `@types/three` | ^0.186 (dev) | TypeScript types |

Install from scratch:

```bash
cd frontend
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Then `npm run dev` as usual. No Vite config changes are needed.

## File layout

```
public/
└── models/                     # .glb files, served as /models/<name>.glb
src/
├── components/three/
│   ├── SceneCanvas.tsx         # the single fixed <Canvas> + <View.Port />
│   ├── SynthViewer.tsx         # one synth: drag handling, lights, scroll rotation
│   ├── SynthModel.tsx          # loads a .glb and normalizes its size/position
│   ├── FitCamera.tsx           # camera that keeps a region framed at any aspect ratio
│   └── EqualizerHero.tsx       # animated equalizer bars in the about section
├── data/
│   └── synths.ts               # catalog of synths shown on the page
├── styling/
│   └── palette.ts              # reads brand colors from index.css for use in 3D
└── views/
    └── Home.tsx                # renders <SceneCanvas /> and every View
```

## How rendering works

### One canvas, many views

Browsers limit how many WebGL contexts a page can have, and each one is expensive. So instead of a `<Canvas>` per model, the page has **one** canvas and many drei `<View>`s:

- `SceneCanvas` renders a `<Canvas>` fixed to the viewport (`position: fixed; inset: 0`) with `<View.Port />` inside it.
- Each `<View>` renders a normal `<div>` in the page layout. Every frame, drei draws that view's scene into the shared canvas, clipped to the div's on-screen rectangle.
- Views that are scrolled off screen are skipped.

`SceneCanvas` must be mounted once per page that uses Views. It currently lives at the top of `Home.tsx`.

### Layering

The canvas sits behind the page content, which has a higher stacking order. Two consequences:

- **Don't put opaque backgrounds over a View's area.** They will cover the 3D scene. Semi-transparent ones will tint it.
- **The canvas has `pointer-events: none`,** so R3F pointer events (`onClick` on a mesh, etc.) do not fire. Handle input on the DOM element around the View instead (see `SynthViewer`), or listen on `window` (see `EqualizerHero`).

### Colors

Never hard-code hex values in 3D components. Use `brandColor()`, which reads the CSS variables from `index.css`:

```ts
import { brandColor } from "../../styling/palette.ts";

<meshStandardMaterial color={brandColor("lush")} />
```

It strips the alpha from 8-digit hex values (e.g. `--color-nguni: #66371fff`) because `THREE.Color` can't parse them.

## Adding a synth model

1. **Export a `.glb`** (binary glTF). Draco-compressed files work too (see below).
2. **Copy it into `public/models/`.**
3. **Add an entry to `src/data/synths.ts`:**

   ```ts
   {
       id: "sh-101",
       name: "SH-101",
       tagline: "One line shown under the name.",
       description: "A short paragraph.",
       model: "/models/sh-101.glb",
       specs: [{ label: "Type", value: "Monosynth" }],
       accent: "ambers",                  // lush | ambers | hazy | oled | nguni | khala
       credit: { ... },                   // required if the model is CC BY or similar
   },
   ```

That's it. The page creates a section for it, alternates the layout left/right, and preloads the file.

### What `SynthModel` does to every model

So models from different sources look consistent, `SynthModel`:

- scales the model so its longest side is 3 world units (`size` prop),
- centers it horizontally and rests its base on `y = 0`,
- forces `depthWrite = true` on all materials. Sketchfab exports often mark solid bodies as `BLEND` (transparent), which makes the mesh render with see-through artifacts.

The model should lie in its natural "on a desk" orientation with +Y up. Sketchfab exports already handle this with a root rotation node. If a new model appears on its side, fix it in Blender or wrap it in a rotated `<group>`.

### Checking a model before adding it

This prints the glTF extensions used, which tells you whether Draco or other loaders are needed:

```bash
node -e "const b=require('fs').readFileSync('public/models/YOUR_MODEL.glb');const j=JSON.parse(b.slice(20,20+b.readUInt32LE(12)).toString());console.log(j.extensionsUsed, j.extensionsRequired, j.asset)"
```

- `KHR_draco_mesh_compression`: Draco-compressed. Works out of the box, but see below about the decoder.
- `asset.extras.license`: Sketchfab models put the license here. **CC BY models must be credited on the page**, so fill in `credit`.

### Draco-compressed models

drei's `useGLTF` decodes Draco automatically, but by default it downloads the decoder from Google's CDN (`gstatic.com`) the first time a compressed model loads. To serve it from our own site instead, copy `node_modules/three/examples/jsm/libs/draco/gltf/` to `public/draco/` and pass the path:

```ts
useGLTF(url, "/draco/");
useGLTF.preload(url, "/draco/");
```

## Scroll and drag rotation

Implemented in `SynthViewer.tsx`:

- **Scroll:** each frame, `SynthStage` reads its section's `getBoundingClientRect()` and turns it into a progress value from 0 (section entering at the bottom) to 1 (leaving at the top). Progress maps to rotation, eased with `THREE.MathUtils.damp`.
- **Drag:** pointer events on the wrapper div add to a rotation offset stored in a ref. Refs (not React state) are used so dragging doesn't re-render React 60 times a second.
- **Mobile:** the wrapper has `touch-action: pan-y`, so vertical swipes still scroll the page and only horizontal swipes spin the model. Don't add drei `OrbitControls` here. It sets `touch-action: none` and would block page scrolling on phones.

Tune the feel with the constants in `SynthStage`: the rotation range (`-0.9` to `0.9` radians), the damping (`6`), and the float amplitude (`0.04`).

## Camera framing

`FitCamera` takes a world-space `width` x `height` that must stay visible and a `direction` to look from. It moves the camera back along that direction until the region fits the view's aspect ratio. This keeps models uncropped on both wide desktop panels and narrow phones.

If a model is cut off at the edges of its box, increase `width`/`height` on its `FitCamera`. If it looks too small, decrease them.

## Lighting

`SynthStage` uses `<Environment>` built from `<Lightformer>` panels instead of an HDR preset. drei's presets (`preset="city"` etc.) download HDR files from a CDN at runtime. Local light panels avoid that network dependency.

Each synth's `accent` color tints a rim light behind it. `ContactShadows` draws the soft shadow under the model, so the canvas doesn't need `shadows` enabled.

## Performance notes

- Keep models small. The TR-909 is about 4.6 MB. Reduce polygon count and texture size (1024–2048 px is usually plenty) before adding a model.
  [`gltf-transform`](https://gltf-transform.dev/) can do this: `npx @gltf-transform/cli optimize in.glb out.glb --texture-compress webp`.
- `EqualizerHero` uses a single `instancedMesh` for all 198 bars: one draw call instead of 198. Use instancing for any repeated geometry.
- Three.js adds about 1 MB (minified) to the bundle, which triggers Vite's chunk-size warning. To reduce first-load size, lazy-load the 3D components with `React.lazy`.

## Debugging

- **Model doesn't show up:** check the Network tab for a 404 on `/models/...`. Paths are relative to `public/`, so `public/models/x.glb` is `/models/x.glb`.
- **Black or flat-looking model:** usually a lighting problem. Check that the `Environment` block is inside the View.
- **Scene shows in the wrong place or not at all:** make sure `SceneCanvas` is mounted on the page and that the View's parent div has a real height (e.g. `h-[50vh]`, not `h-full` inside an auto-height parent).
- **Content renders on top of the model:** an element with a background is overlapping the View's area. See [Layering](#layering).
- **Console warning `THREE.Clock: This module has been deprecated`:** this comes from inside R3F, not our code. It's harmless and will go away when R3F updates.
