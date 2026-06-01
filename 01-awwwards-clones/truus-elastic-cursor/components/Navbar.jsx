'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus) cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                            <span className="logo-work-text">work</span>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/68a46f25779a71fac3a11903_SnapInsta.jpg" loading="eager" alt="Feestje bouwe? App Douwe" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">douwe egberts</span>
                                        <h4 className="nav-work-title">feestje bouwe? app douwe</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School.avif" loading="eager" alt="Skibidi school" sizes="100vw" srcSet="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School-p-500.avif 500w, https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/6880a344675f3a6144ed04df_01_HEMA_Back2School.avif 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">hema</span>
                                        <h4 className="nav-work-title">skibidi school</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3.avif" loading="eager" alt="Hema socials" sizes="100vw" srcSet="https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3-p-500.avif 500w, https://cdn.prod.website-files.com/683863cbe1f5a81b667b9939/686b7e0ed3ab3045b28a2012_3.avif 1080w" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">hema</span>
                                        <h4 className="nav-work-title">hema socials</h4>
                                    </div>
                                </div>
                                <a href="#" className="nav-work-btn"><span className="nav-work-btn__text">All our work</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <svg className="logo-truus" width="150" height="40" viewBox="0 0 150 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.79986 10.5614L3.32816 10.5614C2.54248 10.5614 1.76932 10.3175 1.14394 9.83464C0.61125 9.42382 0.118633 8.8021 0.0184395 7.88305C-0.179442 6.06784 1.23161 6.04243 3.4676 6.04243C3.7306 6.04243 3.99445 6.05683 4.25745 6.05683L9.14271 6.05683L11.544 1.67339C11.544 1.67339 12.0258 0.572239 13.9462 0.140248C14.7427 -0.0393251 15.5676 -0.0418662 16.37 0.106366C16.37 0.106366 19.5428 0.810258 18.3864 3.37849L17.1891 5.93571L26.7968 5.93571C28.546 5.93571 29.5179 7.60099 28.6587 8.76906C28.637 8.79871 28.617 8.83005 28.5911 8.858C27.0114 10.5877 22.8283 10.5622 22.8283 10.5622L15.08 10.5622L11.6809 17.3547C11.3403 18.0332 11.0881 18.7557 10.9512 19.5045C10.6907 20.9292 10.7358 22.8918 12.6244 23.7126C15.7505 25.0704 19.7073 20.9123 19.7073 20.9123L29.4686 11.9218C30.2868 11.1687 31.2537 10.5953 32.3124 10.2759C33.8412 9.81431 35.8384 9.77281 37.1142 11.9014C37.1142 11.9014 39.6524 11.527 40.9332 11.3898C42.6824 11.2018 44.5118 11.4872 45.1581 13.4845C45.8043 15.4819 44.3139 17.0523 44.3139 17.0523L40.5967 21.1553C40.5967 21.1553 38.9594 22.8604 39.8762 23.4686C40.7011 24.0167 44.3106 24.8586 49.3495 19.823C50.3581 18.8421 51.8994 17.1141 52.5682 16.2467C53.9333 14.4756 57.658 9.67963 62.3253 11.1713C62.3253 11.1713 64.5296 11.6651 63.1653 14.2155L60.2171 19.5062C59.9917 19.911 59.818 20.3447 59.7178 20.7979C59.5625 21.4967 59.5291 22.4107 60.1645 22.9824C60.1645 22.9824 62.2611 24.9535 66.8875 20.3032L70.9295 15.9875C71.5832 15.2896 72.3747 14.7356 73.2615 14.3943C74.0396 14.0944 74.9789 13.9191 75.8915 14.2147C75.8915 14.2147 78.2686 14.5688 78.0524 18.4762L78.0524 20.9114C78.0524 20.9114 77.8077 24.7705 83.2148 21.3985C83.2148 21.3985 87.0263 19.3003 91.2579 13.8488C91.2579 13.8488 93.2534 10.7088 97.6644 11.0451C98.1194 11.0798 98.5695 11.178 98.9903 11.3576C99.5839 11.6117 100.313 11.998 100.542 13.0119C100.59 13.2203 100.557 13.6548 100.238 14.2028L100.044 14.5662C99.4946 15.5979 99.0504 16.2628 98.4726 17.2784C98.0844 17.9612 97.7537 18.6227 97.2352 19.6883C96.8779 20.4227 95.805 22.4818 97.3797 23.2247C99.2884 24.1251 102.083 22.0574 103.623 20.5455L107.704 16.284C107.704 16.284 110.383 13.1152 112.746 14.0927C112.746 14.0927 115.646 14.9084 115.027 19.9373C115.027 19.9373 114.703 22.5098 116.107 22.8596C117.511 23.2094 121.461 22.6029 125.231 19.0852C128.196 16.3187 129.838 14.2138 130.405 13.4405C130.728 13 131.086 12.5858 131.482 12.2131C132.659 11.106 134.961 9.43992 137.773 9.95068C138.338 10.0532 138.841 10.3869 139.124 10.8926C139.457 11.4864 139.62 12.4359 138.917 13.8496C138.917 13.8496 146.35 20.0542 143.239 25.1737C141.135 28.6364 136.073 31.5096 131.927 31.9704C129.616 32.227 126.632 30.7718 125.951 29.3141C125.951 29.3141 125.428 28.4026 126.311 27.4878C127.497 26.2613 128.952 25.1746 128.952 25.1746C128.952 25.1746 131.386 23.4017 133.397 24.8425C133.599 24.9874 133.822 25.1 134.056 25.1771C134.655 25.3745 135.522 25.3999 135.406 23.8235C135.357 23.1442 135.136 22.4903 134.786 21.9092C134.189 20.9182 133.241 19.7154 132.194 18.8421C132.194 18.8421 118.989 33.4044 110.466 29.8003C110.466 29.8003 107.687 28.7355 107.464 24.1988C107.464 24.1988 98.961 31.7485 93.8988 31.7485C88.8365 31.7485 86.9504 28.9566 86.5755 25.4168C86.5755 25.4168 79.3507 30.6524 74.8111 30.6524C71.5957 30.6524 70.9871 28.6313 70.249 24.0768C70.249 24.0768 62.58 32.5218 55.7226 31.5045C48.8652 30.4872 49.4806 25.5379 49.4806 25.5379C49.4806 25.5379 41.7256 32.2516 34.834 31.8696C34.834 31.8696 31.0567 31.8467 29.8226 29.237C28.7263 26.9203 29.77 24.9264 31.1134 22.9807C32.8276 20.498 33.2743 20.0584 33.2743 20.0584C33.2743 20.0584 34.7613 18.4025 34.1142 17.7452C33.5273 17.1488 32.451 17.735 31.6553 18.3279C31.161 18.6964 30.7118 19.1233 30.3077 19.5909C28.4207 21.7745 18.621 32.4913 8.54406 31.8696C-2.67259 31.1775 2.65519 18.654 3.86252 16.284"
                            fill="currentColor"></path>
                    </svg>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 27" fill="none" className="nav-bar__whatsapp-svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.601 0.986335C11.8021 1.01421 11.8112 1.04366 12.0483 1.04591C12.4513 1.04943 12.8582 1.03181 13.2602 1.04591C14.7297 1.09749 16.3092 1.56281 17.684 2.0713C18.1173 2.2315 18.4074 2.52491 18.7836 2.75782C18.9541 2.86323 19.1764 2.93811 19.3335 3.03712C19.5277 3.15943 19.7215 3.30714 19.9233 3.43555C20.3796 3.7252 20.7523 4.04895 21.1381 4.42383C21.197 4.48126 21.2369 4.59395 21.2729 4.62403C21.314 4.65863 21.388 4.65528 21.4399 4.6963C21.7068 4.90722 22.4207 5.74735 22.6147 6.04298C22.7185 6.20149 22.7985 6.47832 22.9067 6.61329C23.0415 6.7815 23.1644 6.86231 23.2963 7.08692C23.7885 7.92434 24.1902 8.84837 24.4702 9.7793C24.6279 10.304 24.8111 10.9219 24.8608 11.4668C24.9707 12.6708 25.0812 13.7784 24.9155 14.9785C24.8495 15.4578 24.7632 15.9691 24.6469 16.4365C24.4028 17.4173 23.9978 18.3669 23.5952 19.3125L23.5942 19.3154C23.2319 20.1653 22.4331 20.9908 21.8686 21.71C21.6788 21.9518 21.5246 22.1892 21.2797 22.3965C21.0348 22.6037 20.7282 22.768 20.4858 22.9746C20.3515 23.0889 20.2324 23.2615 20.0844 23.3711C19.9297 23.4854 19.7093 23.5536 19.5795 23.6641C18.8674 24.2709 18.4307 24.4852 17.5708 24.8457C16.3894 25.341 15.3983 25.5527 14.143 25.8154C14.0198 25.8414 13.6705 25.8663 13.5473 25.8525C12.9146 25.7827 12.2271 25.9044 11.5727 25.8545C10.0414 25.7376 8.57578 25.2528 7.1401 24.7734C7.00809 24.7291 6.84411 24.5744 6.72701 24.5498C6.36124 24.4742 5.86748 24.7318 5.5151 24.8535C4.11582 25.337 2.69086 25.7679 1.29732 26.2774C1.16321 26.3264 1.01916 26.4488 0.862752 26.4805C0.562812 26.5413 0.382276 26.4893 0.175252 26.2725C-0.0110214 26.0774 -0.0238393 25.8442 0.0414625 25.5899C0.195974 24.988 0.457528 24.3357 0.623494 23.7432C0.689129 23.509 0.689327 23.2415 0.768025 22.9912C0.86868 22.6711 1.01713 22.3593 1.10885 22.0225C1.25986 21.4672 1.50066 20.9638 1.61568 20.3877C1.66507 20.1397 1.73727 19.8129 1.65474 19.5703C1.54703 19.2542 1.22105 18.8061 1.07857 18.4512C0.98014 18.2061 0.934053 17.924 0.84615 17.6924C0.795172 17.5578 0.685305 17.446 0.623494 17.3076C0.333338 16.6573 0.234002 15.75 0.137166 15.044C0.0291742 14.2597 -0.0144194 13.51 0.00435316 12.7207C0.00976743 12.4965 0.125735 12.263 0.156697 12.0391C0.225199 11.5469 0.215443 11.048 0.327595 10.5459C0.427657 10.0991 0.607537 9.65975 0.740681 9.23341C1.04177 8.26936 1.59197 7.3249 2.13326 6.47266C2.68319 5.60691 3.57311 4.75118 4.3276 4.06934C4.65535 3.77309 4.99265 3.53295 5.33345 3.25684C5.60926 3.03334 5.96284 2.93518 6.23677 2.75782C6.99243 2.26894 7.82882 1.80324 8.70553 1.52735C9.27166 1.34921 11.0774 0.914319 11.601 0.986335ZM8.61275 6.26563C8.24195 6.2935 7.52111 6.42855 7.19381 6.59864C7.0884 6.6534 7.03981 6.75373 6.9526 6.80469C6.77895 6.90626 6.5672 6.92775 6.35787 7.0713C5.53363 7.63716 5.10203 9.42643 5.26802 10.3643C5.304 10.5685 5.34605 10.781 5.38521 10.9824C5.4843 11.4925 5.65625 11.8143 5.77095 12.292C5.86034 12.6635 6.20472 13.0539 6.33052 13.4258C8.20336 16.9242 11.6057 19.8244 15.6147 20.3848C16.7183 20.42 17.5983 20.0958 18.5063 19.5127C18.9765 19.211 19.0117 18.9824 19.1938 18.5078C19.2868 18.2656 19.5158 18.014 19.5639 17.7266C19.5849 17.6004 19.5657 17.4844 19.5854 17.3643C19.6052 17.2441 19.6944 17.1274 19.7231 16.9902C19.7846 16.6955 19.8101 16.284 19.5297 16.0918C19.3912 15.9972 19.1379 15.9595 19.0063 15.8828C18.956 15.8537 18.9069 15.7462 18.8461 15.6914C18.5871 15.4585 18.1002 15.3976 17.7778 15.2607C17.3352 15.0726 16.4148 14.5509 15.9633 14.5606C15.9382 14.5622 15.5716 14.6637 15.5424 14.6758C15.3846 14.7418 15.0675 15.2811 14.976 15.4502C14.8888 15.611 14.7512 16.0087 14.6655 16.1143C14.3396 16.5154 13.5792 16.4394 13.1704 16.2139C12.3996 15.7887 11.4294 14.9649 10.8569 14.3145C10.5344 13.9479 9.89438 13.3129 9.76314 12.8535C9.62042 12.3534 9.57275 11.9847 9.94869 11.5781C10.159 11.351 10.6709 10.903 10.7944 10.6367C10.8861 10.4394 10.8788 10.1244 10.7983 9.92481C10.4411 9.04176 10.0609 8.17693 9.69478 7.28907C9.64899 7.17828 9.63771 7.05901 9.58931 6.94727C9.51318 6.77179 9.28563 6.52143 9.13717 6.41016C9.00243 6.30927 8.7781 6.25318 8.61275 6.26563Z" fill="currentColor"></path>
                            </svg>
                        </div>

                        {/* Pop-out Box for Right Side */}
                        <div className="nav-popout nav-wa-box">
                            <div className="nav-popout-inner">
                                <img src="/assets/wa_qr_code.png" className="nav-wa-qr" alt="WhatsApp QR Code" />
                                <h4 className="nav-wa-title">whatsapp us</h4>
                                <p className="nav-wa-desc">Scan the QR code to chat with us via your smartphone.</p>
                                <a href="#" className="nav-wa-link">
                                    <span className="nav-wa-link-text">Chat via desktop</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg nav-wa-link-svg">
                                        <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                        <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
