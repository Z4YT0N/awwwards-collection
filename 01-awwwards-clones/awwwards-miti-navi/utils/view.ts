export const isInView = (element: HTMLElement, partialVisible: boolean) => {
  const { top, bottom } = element.getBoundingClientRect();

  // if the element is partially visible
  if (partialVisible) {
    return top < window.innerHeight && bottom >= 0;
  }

  // element is completely visible
  return top >= 0 && bottom <= window.innerHeight;
};
