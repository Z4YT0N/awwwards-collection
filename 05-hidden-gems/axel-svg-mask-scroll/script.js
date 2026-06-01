var loaderNumber = document.querySelector('#loader-number');
var loaderStar = document.querySelector('#loader-star');
var loader = document.querySelector('#loader');

function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};

locoScroll();

function loaderAnime() {
    var countProgress = 0;

    // Set an interval to update the progress bar and the loader percentage every 80ms
    var prgInt = setInterval(function () {
        // Increment the progress by a random value between 0 and 8 to simulate smoother progress
        countProgress += Math.floor(Math.random() * 8);

        // If progress reaches or exceeds 100, set it to 100 and clear the interval
        if (countProgress >= 100) {
            countProgress = 100;
            clearInterval(prgInt); // This is to stop the progress bar from going on forever

            // Scale up the star and hide the loader using GSAP
            gsap.to(loaderStar, {
                scale: 100,
                duration: 1.9,
                ease: "power4.inOut",
                onComplete: function () {
                    gsap.to(loader, {
                        opacity: 0,
                        duration: 0.6,
                        onComplete: function () {
                            loader.style.display = 'none'; // Remove the loader from the view
                        }
                    });
                }
            });
        }

        // Update the text content of the loader number
        loaderNumber.textContent = countProgress + '%';

        // Rotate the star
        gsap.to(loaderStar, {
            rotation: countProgress * 3.6,
            duration: 0.6,
            ease: "linear"
        });

    }, 80);
}

loaderAnime();


function svgAnime() {
    var tl1 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page7",
            markers: false,
            start: "50% 50%",
            end: "230% 50%",
            scrub: true,
            pin: true
        }
    });

    tl1.to("#page7 .svg", {
        maskSize: "200%"
    }, "svg");

    tl1.to("#page7 .come-up-img", {
        backgroundSize: "100%"
    }, "svg");

    tl1.to("#page7 .svg2", {
        maskSize: "200%"
    }, "svg2");

    tl1.to("#page7 .come-up-img2", {
        backgroundSize: "100%"
    }, "svg2");

    // Fade out the first text when the second section starts loading
    tl1.to("#page7 .overlay .overlay-heading", {
        opacity: 0,
        duration: 0.3,
        delay: -0.12 
    }, "svg2");

    tl1.to("#page7 .overlay .overlay-top .button1, #page7 .overlay .overlay-top .button2", {
        opacity: 0,
        duration: 0.3,
        delay: -0.12
    }, "svg2");

    tl1.to(".overlay-heading h1", {
        opacity: 0,
        duration: 0.3,
        delay: 0.8
    }, "end");

    tl1.to(".overlay-top .button1", {
        opacity: 0,
        duration: 0.3,
        delay: 0.8
    }, "end");

    tl1.to(".overlay-top .button2", {
        opacity: 0,
        duration: 0.3,
        delay: 0.8
    }, "end");
};

svgAnime();


function mainHeading() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page1",
            markers: false,
            start: "top 18%",
            end: "top -400%",
            scrub: true
        }
    });

    tl2.to("#page-heading h1", {
        fontSize: "3.72vw"
    })
};

mainHeading();


function page7Anime() {
    var tl3 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page7",
            markers: false,
            start: "top 5%",
            end: "top -10%",
            scrub: true
        }
    });

    tl3.to("#page-heading h1", {
        color: "#fff"
    }, "page7");

    tl3.to("#nav-part1-middle h4", {
        color: "#fff"
    }, "page7");

    tl3.to("#nav-part1-end h4", {
        color: "#fff"
    }, "page7");

    tl3.to("#nav-part2 .text h3", {
        color: "#a3a3a3"
    }, "page7");

    tl3.to("#nav-part2 .first h3", {
        color: "#fff"
    }, "page7");
};

page7Anime();