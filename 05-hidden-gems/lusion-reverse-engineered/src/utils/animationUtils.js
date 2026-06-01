export function animate(duration, onAnimationFrame, onDone) {
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const percent = Math.min(elapsed / duration, 1);

        onAnimationFrame(percent);

        if (percent < 1) {
            requestAnimationFrame(step);
        }
        else {
            onDone?.();
        }
    }

    requestAnimationFrame(step);
}

export function animateAsync(duration, onAnimationFrame) {
    return new Promise((resolve) => {
        animate(duration, onAnimationFrame, resolve);
    });
}

export function waitAsync(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}