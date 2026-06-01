import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE = [.24, .43, .15, .97];
const TEXT = "Transira";

export default function IntroAnimation() {
    const [scope, animate] = useAnimate();
    const [hide, setHide] = useState(false);
    const [useDifferentAnimation, setUseDifferentAnimation] = useState(false);

    useEffect(() => {
        const body = document.getElementById('body');
        let animationControls;

        if(!useDifferentAnimation) {
            body?.classList?.add('overflow-hidden');
        } else {
            body?.classList?.remove('overflow-hidden');

            animationControls = animate(scope.current, { backgroundColor: 'var(--main-color)', color: 'var(--text-color)' }, {
                duration: 0.5,
                onComplete: () => setHide(true)
            });
        };

        return animationControls?.stop;
    }, [useDifferentAnimation, scope, animate]);

    return (
        <AnimatePresence>
            {
                !hide ? 
                    <motion.div
                        ref={scope}
                        aria-hidden={true}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="fixed z-[9999999] top-0 left-0 w-screen h-screen bg-[var(--text-color)] text-[var(--main-color)] pointer-events-none"
                    >
                        <div className="flex gap-4 w-full h-full items-center justify-center font-light text-2xl uppercase">
                            {TEXT.split("").map((letter, index) => (
                                <span key={index} className='font-inter inline-block overflow-hidden'>
                                    <motion.span 
                                        initial={{ x: useDifferentAnimation ? '0%' : '100%' }} 
                                        animate={{ x: useDifferentAnimation ? '-105%' : '0%' }} 
                                        onAnimationComplete={() => index === (TEXT.length - 1) && setUseDifferentAnimation(true)}
                                        transition={{ 
                                            duration: 1.5, 
                                            ease: EASE,
                                            delay: useDifferentAnimation ? (index + 10) / 25 : (index / 25)
                                        }} 
                                        className='inline-block'
                                    >
                                        <span>{letter}</span>
                                    </motion.span>
                                </span>
                            ))}
                        </div>
                    </motion.div> :
                    null
            }
        </AnimatePresence>
    )
}