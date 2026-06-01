export const $ = (element: string): HTMLElement | null =>
	document.querySelector(element);

export const $$ = (elments: string): NodeListOf<HTMLElement> =>
	document.querySelectorAll(elments);
