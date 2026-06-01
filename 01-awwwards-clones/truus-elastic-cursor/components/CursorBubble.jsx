'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    useEffect(() => {
        const cursorBubble = document.querySelector('.cursor-bubble');
        if (!cursorBubble) return;

        const xTo = gsap.quickTo(cursorBubble, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(cursorBubble, 'y', { duration: 0.5, ease: 'power3' });

        let isHoveringClickable = false;
        gsap.set(cursorBubble, { rotation: -30 });

        const onMouseMove = (e) => {
            xTo(e.clientX + 13);
            yTo(e.clientY - 43);
        };

        const onMouseOver = (e) => {
            const targetSelector = '.footer-column h3, .footer-map-link span, .footer-email, .footer-whatsapp, .single-social, .logo-truus, .nav-work-btn';
            const found = e.target.closest(targetSelector);

            if (found && !isHoveringClickable) {
                isHoveringClickable = true;
                if (found.matches('.logo-truus')) cursorBubble.textContent = 'to home';
                else if (found.matches('.nav-work-btn')) cursorBubble.textContent = 'click';
                else cursorBubble.textContent = 'click';
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 1, rotation: 0, duration: 1.7, delay: 0.1, ease: 'elastic.out(1, 0.4)' });
            } else if (!found && isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
            }
        };

        const onMouseLeave = () => {
            if (isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return <div className="cursor-bubble">click</div>;
}
