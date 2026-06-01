import { inView, scroll } from 'motion';
import {
	fadeIn,
	slideBottomWithFadeIn,
	slideInWithFadeIn,
} from '@utils/animations';
import { $, $$ } from '@utils/domSelectors';

const $nabar = $('.nav') as HTMLElement;

const $headerTitle = $('.header-title') as HTMLElement;
const $headerVideo = $('.header-video') as HTMLElement;
const $modal = $('.modal') as HTMLElement;

const $servizi = $('.ani-servizi') as HTMLElement;

const $sectionsDescription = $$('.container-des');

const $wrappersImg = $$('.ani-ind');
const $imgsParallax = $$('.parallax-img');

const $gridNumberItme = $$('.ani-grid-number');

const $headersLetter = $$('.ani-header-lettere');

fadeIn($nabar);
slideInWithFadeIn($headerTitle);
fadeIn($headerVideo);
fadeIn($modal);

$sectionsDescription.forEach(section => {
	inView(section, (_inf): void => {
		slideInWithFadeIn(section);
	});
});

inView($servizi, (_inf): void => {
	slideBottomWithFadeIn($servizi);
});

$gridNumberItme.forEach(item => {
	inView(item, (_inf): void => {
		slideBottomWithFadeIn(item);
	});
});

$imgsParallax.forEach((img: HTMLElement, index) => {
	scroll(
		({ y }) => {
			const yProgress = Number(y.progress.toFixed(2));
			const valueTranslate = yProgress * -240;
			img.style.transform = `translateY(${valueTranslate}px)`;
		},
		{
			offset: ['start end', '-50px -50px'],
			target: $wrappersImg[index],
		}
	);
});
$headersLetter.forEach((art: HTMLElement) => {
	const img = art.querySelector('img') as HTMLElement;
	art.addEventListener('mouseenter', () => {
		img.style.transform = 'translate3d(-1.5rem, -1.5rem, .5rem)';
		img.style.transition = 'transform 0.5s ease-in-out';
	});
	art.addEventListener('mouseleave', () => {
		img.style.transform = 'translate3d(0, 0, 0)';
		img.style.transition = 'transform 0.5s ease-in-out';
	});
});
