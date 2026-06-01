import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

document.addEventListener('astro:page-load', () => {
	// setTimeout(() => {
	gsap.registerPlugin(ScrollTrigger);

	let tl = gsap.timeline({
		paused: true
	});

	tl.fromTo(".anim-typewriter", {
		width: "0"
	}, {
		width: "4.9em",
		ease: "steps(7)",
		duration: 1.5
	}, 0);

	tl.fromTo(".anim-typewriter", {
		"border-right-color": "rgba(79, 70, 229, 1)"
	}, {
		"border-right-color": "rgba(79, 70, 229, 0)",
		repeat: -1,
		ease: "steps(7)",
		duration: 1
	}, 0);

	tl.play();


	gsap.from(".appear-siblings", {
		opacity: 0,
		y: 50,
		duration: 1,
		ease: 'power2.out',
		stagger: 0.1,
		scrollTrigger: {
			trigger: ".appear-siblings",
			start: "top 90%",
		}
	});

	gsap.from(".appear-siblings2", {
		opacity: 0,
		y: 50,
		duration: 1,
		ease: 'power2.out',
		stagger: 0.1,
		scrollTrigger: {
			trigger: ".appear-siblings2",
			start: "top 90%",
		}
	});

	gsap.from(".appear-siblings3", {
		opacity: 0,
		y: 50,
		duration: 1,
		ease: 'power2.out',
		stagger: 0.1,
		scrollTrigger: {
			trigger: ".appear-siblings3",
			start: "top 90%",
		}
	});

	gsap.utils.toArray(".appear").forEach(element => {
		gsap.from(element, {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: "top 95%",
			},
		});
	});

	gsap.utils.toArray(".appear-top").forEach(element => {
		gsap.from(element, {
			opacity: 0,
			y: -50,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: "top 95%",
			},
		});
	});
	// }, 5600000);
})