import * as React from 'react';

export interface PinchZoomPanProps {
  className?: string;
  style?: React.CSSProperties;
  captureWheel?: boolean;
  debug?: boolean;
}

export default class PinchZoomPan extends React.Component<PinchZoomPanProps> {}
