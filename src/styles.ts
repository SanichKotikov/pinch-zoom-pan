import React from 'react';

export const ROOT_STYLES: React.CSSProperties = {
  position: 'relative',
  transform: 'translateZ(0)',
  overflow: 'hidden',
};

export const POINT_STYLES: React.CSSProperties = {
  position: 'absolute',
  width: 0,
  height: 0,
  transform: 'translate(0, 0) scale(1)',
  transformOrigin: 'center',
  willChange: 'transform',
};

export const CANVAS_STYLES: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

export const DEBUG_STYLES: React.CSSProperties = {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: 4,
  fontSize: 10,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, .3)',
  whiteSpace: 'pre-wrap',
};
