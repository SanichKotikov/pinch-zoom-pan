import React from 'react';

export enum pzpAction {
  None = 0,
  Moving = 1,
  Pinching = 2,
}

export interface PZPTransform {
  x: number;
  y: number;
  z: number;
}

export interface PZPProps {
  min: number;
  max: number;
  captureWheel?: boolean;
  debug?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface PZPState {
  transform: PZPTransform;
  action: pzpAction;
}

export interface EventMapItems {
  name: string;
  handler: any;
}
