export const splitArrayInHalf = <T>(
  arr: Array<T> = [],
): [Array<T>, Array<T>] => {
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(-half);

  return [firstHalf, secondHalf];
};

export const isInView = (
  element: HTMLElement | null,
  partialVisible: boolean,
) => {
  if (!element) return false;

  const { top, bottom } = element.getBoundingClientRect();

  // if the element is partially visible
  if (partialVisible) {
    return top < window.innerHeight && bottom >= 0;
  }

  // element is completely visible
  return top >= 0 && bottom <= window.innerHeight;
};
