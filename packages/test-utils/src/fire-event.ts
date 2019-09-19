export const fireMouseMoveEvent = (x: number, y: number) => {
  document.dispatchEvent(
    new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    }),
  );
};
