import * as React from 'react';
import { isTouch, getClientXY, getMidXY, limitZoom, getTouchesRange, getWheelDelta } from './helpers';
import { ROOT_STYLES, POINT_STYLES, CANVAS_STYLES, DEBUG_STYLES } from './styles';
import { pzpAction, PZPProps, PZPState, EventMapItems } from './types';

class PinchZoomPan extends React.Component<PZPProps, PZPState> {

  state: PZPState = {
    transform: { x: 0, y: 0, z: 1 },
    action: pzpAction.None,
  };

  static defaultProps = {
    min: 0.1,
    max: 3.5,
  };

  private eventsMap: EventMapItems[];

  private root: HTMLElement;
  // private refPoint: HTMLElement;
  // private canvas: HTMLElement;

  private currentX: number;
  private currentY: number;
  private currentZ: number;
  private currentR: number;

  constructor(props: PZPProps) {
    super(props);
    const touch = isTouch();
    this.eventsMap = [
      { name: touch ? 'touchstart' : 'mousedown', handler: this.onTouchStart },
      { name: touch ? 'touchmove' : 'mousemove', handler: this.onTouchMove },
      { name: touch ? 'touchend' : 'mouseup', handler: this.onTouchEnd },
      { name: touch ? 'touchleave' : 'mouseleave', handler: this.onTouchEnd },
      { name: 'touchcancel', handler: this.onTouchEnd },
      { name: 'wheel', handler: this.onWheel },
    ];
  }

  componentDidMount() {
    this.subscribe();
    this.init();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  private subscribe() {
    this.eventsMap.forEach((event: EventMapItems) => {
      this.root.addEventListener(event.name, event.handler);
    });
  }

  private unsubscribe() {
    this.eventsMap.forEach((event: EventMapItems) => {
      this.root.removeEventListener(event.name, event.handler);
    });
  }

  private init() {
    const rootRect = this.root.getBoundingClientRect();
    const x = rootRect.width / 2;
    const y = rootRect.height / 2;
    this.setState({ transform: this.updateTransform({ x, y }) });
  }

  private updateTransform(transform: { x?: number, y?: number, z?: number }) {
    return { ...this.state.transform, ...transform };
  }

  private updateCurrentPos(X: number, Y: number) {
    this.currentX = X;
    this.currentY = Y;
  }

  private getPositionByPoint(zoom: number, X: number, Y: number) {
    const { x, y, z } = this.state.transform;
    const { left, top } = this.root.getBoundingClientRect();
    const offsetX = (X - left - window.pageXOffset) - x;
    const offsetY = (Y - top - window.pageYOffset) - y;
    const ratio = zoom / z;
    return {
      x: x - (offsetX * ratio - offsetX),
      y: y - (offsetY * ratio - offsetY),
    };
  }

  private onTouchStart = (event: TouchEvent | MouseEvent) => {
    event.preventDefault();
    if (
      typeof TouchEvent !== 'undefined' && // IE & EDGE doesn't have TouchEvent
      event instanceof TouchEvent &&
      event.touches.length === 2
    ) {
      this.setState({ action: pzpAction.Pinching });
      this.currentZ = this.state.transform.z;
      this.currentR = getTouchesRange(event);
    } else {
      this.startMoving(event);
    }
  };

  private onTouchEnd = (event: TouchEvent | MouseEvent) => {
    if (
      this.state.action === pzpAction.Pinching &&
      typeof TouchEvent !== 'undefined' && // IE & EDGE doesn't have TouchEvent
      event instanceof TouchEvent &&
      event.touches.length === 1
    ) {
      this.startMoving(event);
    } else {
      this.setState({ action: pzpAction.None });
    }
  };

  private startMoving(event: TouchEvent | MouseEvent) {
    this.setState({ action: pzpAction.Moving });
    const { X, Y } = getClientXY(event);
    this.updateCurrentPos(X, Y);
  }

  private onTouchMove = (event: TouchEvent | MouseEvent) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    const action = this.state.action;
    if (action === pzpAction.Moving) this.move(event);
    else if (action === pzpAction.Pinching) this.pinch(event as TouchEvent);
  };

  private move(event: TouchEvent | MouseEvent) {
    const { X, Y } = getClientXY(event);
    const x = this.state.transform.x - (this.currentX - X);
    const y = this.state.transform.y - (this.currentY - Y);
    this.setState({ transform: this.updateTransform({ x, y }) });
    this.updateCurrentPos(X, Y);
  }

  private pinch(event: TouchEvent) {
    // webkit
    let scale: number = (event as any).scale;
    let pageX: number = (event as any).pageX;
    let pageY: number = (event as any).pageY;

    // others
    if (scale === undefined || pageX === undefined || pageY === undefined) {
      scale = getTouchesRange(event) / this.currentR;
      const { mX, mY } = getMidXY(event);
      pageX = mX;
      pageY = mY;
    }

    const z = limitZoom(this.currentZ * scale, this.props.min, this.props.max);
    const { x, y } = this.getPositionByPoint(z, pageX, pageY);
    this.setState({ transform: this.updateTransform({ x, y, z }) });
  }

  private onWheel = (event: WheelEvent) => {
    if (!this.props.captureWheel && !event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    const delta = getWheelDelta(event) * -1;
    const z = limitZoom(this.state.transform.z + delta, this.props.min, this.props.max);
    const { x, y } = this.getPositionByPoint(z, event.pageX, event.pageY);
    this.setState({ transform: this.updateTransform({ x, y, z }) });
  };

  private setRoot = (el: HTMLElement | null) =>
    this.root = el as HTMLElement;

  // private setRefPoint = (el: HTMLElement | null) =>
  //   this.refPoint = el as HTMLElement;

  // private setCanvas = (el: HTMLElement | null) =>
  //   this.canvas = el as HTMLElement;

  render() {
    const { x, y, z } = this.state.transform;
    const transform = `translate(${x}px, ${y}px) scale(${z})`;
    return (
      <div
        ref={this.setRoot}
        className={this.props.className}
        style={{ ...ROOT_STYLES, ...this.props.style }}
      >
        <div style={{ ...POINT_STYLES, transform }}>
          <div style={CANVAS_STYLES}>
            {this.props.children}
          </div>
        </div>
        {this.props.debug && (
          <div style={DEBUG_STYLES}>
            {JSON.stringify(this.state, null, '  ')}
          </div>
        )}
      </div>
    );
  }

}

export default PinchZoomPan;
