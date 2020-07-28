# pinch-zoom-pan

A simple module that add pinch-zoom and pan to your HTML element.

### Using

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
create({ element: document.getElementById('root') });
```

#### Frameworks & libraries

* [React example](https://github.com/SanichKotikov/react-family-tree-example/tree/master/src/components/PinchZoomPan)
