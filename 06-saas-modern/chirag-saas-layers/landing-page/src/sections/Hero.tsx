"use client";

import Button from "@/components/Button";
import designExample1Image from "@/assets/images/design-example-1.png";
import designExample2Image from "@/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg";

export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);
        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [
                leftPointerScope.current,
                { x: -100, y: 0 },
                { duration: 0.5, ease: "easeInOut" },
            ],
            [
                leftPointerScope.current,
                { x: 0, y: [0, 16, 0] },
                { duration: 0.5 },
            ],
        ]);

        rightDesignAnimate([
            [
                rightDesignScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
        ]);

        rightPointerAnimate([
            [
                rightPointerScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
            [
                rightPointerScope.current,
                { x: 0, y: [0, 20, 0] },
                { duration: 0.5 },
            ],
        ]);
    }, []);

    return (
        <section
            className="py-24 overflow-x-clip"
            style={{
                cursor: `url(${cursorYouImage.src}), auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 100, x: -100 }}
                    className="absolute -left-40 top-16 hidden lg:block"
                    drag
                >
                    <Image
                        src={designExample1Image}
                        alt="Design Example 1 Image"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, x: -200, y: 100 }}
                    className="absolute left-56 top-96 hidden lg:block"
                >
                    <Pointer name="Ryan" color="red" />
                </motion.div>
                <motion.div
                    ref={rightDesignScope}
                    initial={{ opacity: 0, x: 100, y: 100 }}
                    drag
                    className="absolute -right-64 -top-16 hidden lg:block"
                >
                    <Image
                        src={designExample2Image}
                        alt="Design Example 2 Image"
                        draggable="false"
                    />
                </motion.div>
                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, x: 275, y: 100 }}
                    className="absolute right-80 -top-4 hidden lg:block"
                >
                    <Pointer name="Chirag" />
                </motion.div>
                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold">
                        ✨ $7.5M seed round raised
                    </div>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                    Impactful project, deployed effortlessly
                </h1>
                <p className="text-center text-xl text-white/80 mt-8 max-w-2xl mx-auto">
                    🚀 Deploy your React apps effortlessly — just provide a Git
                    URL, We handle the build and deployment. No setups, no
                    delays. Go live in seconds with ease!
                </p>
                <form className="flex border border-white/15 rounded-full mt-8 md:p-2 max-w-lg mx-auto md:justify-between">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent px-2 w-full outline-none"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        className="whitespace-nowrap"
                        size="sm"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </section>
    );
}
