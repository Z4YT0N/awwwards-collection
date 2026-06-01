<script>
	import { onMount } from "svelte";
	import gsap from "gsap";

	let cursorRef = $state();
	let isTouchDevice = $state(false);
	let isActive = $state(false);

	onMount(() => {
		isTouchDevice =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;

		if (isTouchDevice) return;

		gsap.set(cursorRef, { xPercent: -50, yPercent: -50 });

		const xTo = gsap.quickTo(cursorRef, "x", {
				duration: 0.25,
				ease: "power3",
			}),
			yTo = gsap.quickTo(cursorRef, "y", {
				duration: 0.25,
				ease: "power3",
			});

		const moveCursor = (e) => {
			if (!isActive) {
				isActive = true;
				gsap.to(cursorRef, { autoAlpha: 1, duration: 0.3 });
			}
			xTo(e.clientX);
			yTo(e.clientY);
		};

		const handleHover = () => {
			gsap.to(cursorRef, {
				scale: 3.5,
				background: "rgba(255,255,255,0.1)",
				border: "1px solid rgba(255,255,255,0.5)",
				duration: 0.3,
				ease: "expo.out",
			});
		};
		const handleLeave = () => {
			gsap.to(cursorRef, {
				scale: 1,
				background: "white",
				border: "0px solid transparent",
				duration: 0.3,
				ease: "expo.out",
			});
		};

		const attachEventListeners = () => {
			document
				.querySelectorAll('a, button, [contenteditable="true"]')
				.forEach((el) => {
					if (!el.dataset.cursorBound) {
						el.addEventListener("mouseenter", handleHover);
						el.addEventListener("mouseleave", handleLeave);
						el.dataset.cursorBound = "true";
					}
				});
		};

		window.addEventListener("mousemove", moveCursor);
		// Initial setup and observer for dynamic elements
		attachEventListeners();

		const observer = new MutationObserver((mutations) => {
			let shouldUpdate = false;
			for (let m of mutations) {
				if (m.addedNodes.length > 0) shouldUpdate = true;
			}
			if (shouldUpdate) attachEventListeners();
		});

		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			observer.disconnect();
			document.querySelectorAll("a, button").forEach((el) => {
				el.removeEventListener("mouseenter", handleHover);
				el.removeEventListener("mouseleave", handleLeave);
			});
		};
	});
</script>

{#if !isTouchDevice}
	<div
		bind:this={cursorRef}
		class="fixed top-0 left-0 w-5 h-5 bg-white mix-blend-difference rounded-full pointer-events-none z-[999] opacity-0 invisible transform-gpu"
	></div>
{/if}
