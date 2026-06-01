export const navVariants = {
    hidden: { y: "-100%" },
    vissible: { y: 0, transition: { ease: [0.76, 0, 0.24, 1], duration: 0.7 }, }
};

export const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
        y: "0",
        transition: {
            duration: 0.75,
            ease: [0.33, 1, 0.68, 1],
            delay: i * 0.5,
        },
    }),
};

export const footerVarient = {
    hidden: { y: 50, opacity: 0 },
    vissible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }, },
};

export const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};


export const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

export const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};