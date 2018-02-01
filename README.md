# pinch-zoom-pan

A react component that lets you add pinch-zoom and pan sub components.

## Install

```bash
npm i -S pinch-zoom-pan
```

## Usage

```typescript jsx
import PinchZoomPan from 'pinch-zoom-pan';

<PinchZoomPan>
  <img />
</PinchZoomPan>
```

### Props

| name | description | type | default |
|------|-------------|------|---------|
|className? | additional css class | `string` | `''` |
|style? | additional style | `React.CSSProperties` | `{}` |
|captureWheel? | capture wheel event, otherwise zoom works with holding `Alt` key | `boolean` | `false` |
|debug? | render debug info | `boolean` | `false` |
