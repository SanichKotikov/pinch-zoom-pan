# pinch-zoom-pan

A simple module that add pinch-zoom and pan to your HTML element.

## Using

```bash
npm i -S pinch-zoom-pan
```

```html
<div class="root" id="root">
  <div class="point">
    <div class="canvas">
      <!-- your content here -->
    </div>
  </div>
</div>
```

```css
.root {
  position: relative;
  transform: translateZ(0);
  overflow: hidden;
}

.point {
  position: absolute;
  width: 0;
  height: 0;
  transform: translate(0, 0) scale(1);
  transform-origin: center;
  will-change: transform;
}

.canvas {
  position: absolute;
  transform: translate(-50%, -50%);
}
```

```javascript
import { create } from 'pinch-zoom-pan';

// Run module on mount
const canvas = create({
  element: document.getElementById('root'),
  // optional settings:
  minZoom: 0.5,
  maxZoom: 2,
  captureWheel: true,
});

// Should be called on unmount
canvas.destroy();

// Reset position and zoom to default values
canvas.reset();

// Manually update position and zoom
canvas.update({ z: 1.2 });
canvas.update((prev) => ({ z: prev.z + 0.2 }));
```

## Frameworks & libraries

* [React example](https://github.com/SanichKotikov/react-family-tree-example/tree/master/src/components/PinchZoomPan)
* [Solid example](https://github.com/SanichKotikov/solid-family-tree-example/tree/master/src/components/PinchZoomPan)

## Unsupported frameworks
* svelte

## Contributing

Please read [this documentation](https://github.com/SanichKotikov/contributing) before contributing.
