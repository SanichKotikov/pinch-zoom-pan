import * as React from 'react';

export interface PinchZoomPanProps {
  className?: string;
  style?: React.CSSProperties;
  min?: number;
  max?: number;
  captureWheel?: boolean;
  debug?: boolean;
}

export default class PinchZoomPan extends React.Component<PinchZoomPanProps> {}
