import { animate } from 'motion';

export function fadeIn(el: HTMLElement): void {
	animate(el, { opacity: [0, 1] }, { duration: 2 });
}

export function fadeOut(el: HTMLElement): void {
	animate(el, { opacity: [1, 0] }, { duration: 2 });
}

export function slideInWithFadeIn(el: HTMLElement): void {
	animate(el, { x: [-100, 0] }, { duration: 2 });
	fadeIn(el);
}

export function slideBottomWithFadeIn(el: HTMLElement): void {
	animate(el, { y: [100, 0] }, { duration: 2 });
	fadeIn(el);
}
