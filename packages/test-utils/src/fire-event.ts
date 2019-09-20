export const fireMouseMoveEvent = (x: number, y: number) => {
  dispatchEvent(
    new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    }),
  );
};
