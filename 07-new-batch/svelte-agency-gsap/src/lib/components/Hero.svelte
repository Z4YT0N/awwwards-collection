<script>
    import { onMount } from "svelte";
    import gsap from "gsap";

    let words = $state([]);
    let descRef = $state();
    let ctaContainer = $state();
    let bgRef = $state();

    onMount(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        gsap.set(bgRef, { autoAlpha: 0, scale: 1.05 });
        gsap.set(words, { yPercent: 120, rotateZ: 2 });
        gsap.set([descRef, ctaContainer], { y: 20, autoAlpha: 0 });

        tl.to(bgRef, {
            autoAlpha: 0.6,
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
        })
            .to(
                words,
                {
                    yPercent: 0,
                    rotateZ: 0,
                    duration: 1.4,
                    stagger: 0.1,
                    ease: "expo.out",
                },
                "-=1.5",
            )
            .to(
                descRef,
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=1.0",
            )
            .to(
                ctaContainer,
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=1.0",
            );

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(bgRef, {
                x: x * -1,
                y: y * -1,
                duration: 2,
                ease: "power2.out",
            });
            gsap.to(words, {
                x: x,
                y: y,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.01,
            });
        };

        // Disable parallax tracking on small touch devices
        if (window.innerWidth > 768) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    });
</script>

<section
    id="agency"
    class="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden text-center pt-24 pb-12"
>
    <!-- Cinematic Backing -->
    <div
        bind:this={bgRef}
        class="absolute inset-0 z-0 pointer-events-none will-change-transform"
    >
        <img
            src="/ascii-art.gif"
            alt="Ascii art background"
            class="w-full h-screen object-cover mix-blend-screen opacity-[0.65] block"
        />
        <div
            class="absolute inset-0 bg-linear-to-b from-[#050505]/40 via-[#050505]/10 to-[#050505]"
        ></div>
        <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_90%)]"
        ></div>
    </div>

    <div
        class="relative z-10 w-full flex flex-col items-center justify-center px-4 h-full"
    >
        <h1
            class="text-[15vw] md:text-[8vw] font-serif leading-[0.9] tracking-tight text-white max-w-[95vw] md:max-w-7xl mx-auto flex flex-col items-center mix-blend-difference mb-4"
        >
            <div class="overflow-hidden pb-6 -mb-6">
                <div
                    bind:this={words[0]}
                    class="flex items-center pt-4 will-change-transform"
                >
                    We craft
                </div>
            </div>
            <div class="overflow-hidden pb-8 -mb-8">
                <div
                    bind:this={words[1]}
                    class="flex items-center md:gap-6 will-change-transform pt-4"
                >
                    <span class="italic text-white/50 mr-3 md:mr-6 font-serif"
                        >digital</span
                    > experiences.
                </div>
            </div>
        </h1>

        <p
            bind:this={descRef}
            class="text-lg md:text-2xl text-white/50 max-w-3xl mt-12 md:mt-8 font-sans font-light leading-relaxed mix-blend-difference px-4"
        >
            Pushing the boundaries of immersive web experiences, motion design,
            and digital reality for ambitious global brands.
        </p>

        <div bind:this={ctaContainer} class="mt-8 flex gap-4 z-20">
            <a
                href="#work"
                class="px-8 py-4 bg-white text-black rounded-full font-sans font-medium hover:bg-[#3B82F6] hover:text-white transition-all duration-500 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.15)] inline-block"
            >
                View Selected Works
            </a>
            <a
                href="#services"
                class="hidden md:inline-block px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-sans font-medium hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all duration-500 cursor-pointer"
            >
                Our Services
            </a>
        </div>
    </div>
</section>
