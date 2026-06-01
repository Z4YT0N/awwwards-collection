"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia on cards
            const cards = document.querySelectorAll(".motion-card__card");
            cards.forEach((card) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(card, "rotation");
                const startX = gsap.getProperty(card, "x");
                const startY = gsap.getProperty(card, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(card, {
                        inertia: {
                            x: { velocity: speedX * 20, end: startX },
                            y: { velocity: speedY * 20, end: startY },
                            rotation: { velocity: speedX * 1.5, end: startRotation },
                        },
                    });
                };

                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);
            });

            // Inertia on floating labels
            const labels = document.querySelectorAll(".motion-card__floating-label");
            labels.forEach((label) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(label, "rotation");
                const startX = gsap.getProperty(label, "x");
                const startY = gsap.getProperty(label, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(label, {
                        inertia: {
                            x: { velocity: speedX * 25, end: startX },
                            y: { velocity: speedY * 25, end: startY },
                            rotation: { velocity: speedX * 2, end: startRotation },
                        },
                    });
                };

                label.addEventListener("mousemove", onMove);
                label.addEventListener("mouseenter", onEnter);
                label.addEventListener("mouseleave", onLeave);
            });

            // Entry Animations: Sticker Pop & Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            const topStickerImg = sectionRef.current.querySelector(".motion-card__sticker--top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".motion-card__underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="motion-card-section" id="motion-card-section">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="motion-card__heading">
                <h2 className="motion-card__title">
                    an agency built
                    <br />
                    for the future.
                </h2>
                <p className="motion-card__subtitle">
                    from TV to TikTok.
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="motion-card__sticker motion-card__sticker--top">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            className="motion-card__sticker-img"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
                    <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>


                {/* 4 Photo Cards */}
                <div ref={containerRef} className="motion-card__cards">
                    <div className="motion-card__card motion-card__card--1">
                        <div className="motion-card__card-image">
                            <img
                                src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e614494dac669a4099c_c310914b5a1a573b4c7499e9531f8d52_DE.avif"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--2">
                        <div className="motion-card__card-image">
                            <img
                                src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e607142a7a25157d9dd_1875b9852ca289170917f9060c95b6a4_BolpuntJapie.avif"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--3">
                        <div className="motion-card__card-image">
                            <img
                                src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e60ba19eb1109d3daa5_b1280272f47b3cd3ea25b91391935efa_RonaldoMassage.avif"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--4">
                        <div className="motion-card__card-image">
                            <img
                                src="https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/686b8e607d351d1335f06e04_f1aafb2150d81c3990c906d901d2e7e4_Esprix.avif"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="cover-image"
                            />
                        </div>
                    </div>
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div ref={containerRef} className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text">girls just wanna have fun!</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text">mainstream is not a dirty word</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text">arrogance = old fashioned</p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="motion-card__footer-text">
                <p className="motion-card__description">
                    To reach the new generation you need to know where
                    they are. We are a true 360° agency, working the
                    whole spectrum from TikTok content to TVC and from influencer
                    collabs to out of home spectaculars.
                </p>
            </div>
        </section>
    );
}
