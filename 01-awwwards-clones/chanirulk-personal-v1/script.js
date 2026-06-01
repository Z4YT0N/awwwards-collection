var tl = gsap.timeline();

tl.from("#four",{
    opacity:0,
    y: 10,
    duration:1,
    ease: "Expo.easeInOut"
})
.to("#four",{
    opacity:0,
    y: -10,
    duration:1,
    ease: "Expo.easeInOut"
})
.from("#three",{
    opacity:0,
    y: 10,
    duration:1,
    ease: "Expo.easeInOut"
})
.to("#three",{
    opacity:0,
    y: -10,
    duration:1,
    ease: "Expo.easeInOut"
})
.from("#two",{
    opacity:0,
    y: 10,
    duration:1,
    ease: "Expo.easeInOut"
})
.to("#two",{
    opacity:0,
    y: -10,
    duration:1,
    ease: "Expo.easeInOut"
})
.from("#one",{
    opacity:0,
    y: 10,
    duration:1,
    ease: "Expo.easeInOut"
})
.to("#one",{
    opacity:0,
    y: -10,
    duration:1,
    ease: "Expo.easeInOut"
})
.to("#black",{
    y: "-100%",
    duration:1,
    ease: "Expo.easeInOut"
})
.from("#nav",{
    y: "-10%",
    opacity:0,
    duration:1,
    delay:0,
    ease: "Expo.easeInOut"
}, )
.from("#navmain",{
    y: "-10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#creativeimg",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#arrowimg",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#small-des",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#what",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#button",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )
.from("#follow",{
    y: "10%",
    opacity:0,
    delay: 0,
    duration:1,
    ease: "Expo.easeInOut"
}, )

$('#firsth2 h1').textillate({initialDelay: 5300, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#firsth1 h1').textillate({initialDelay: 5300, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#chaniru').textillate({initialDelay: 5600, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#number').textillate({initialDelay: 5600, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#about').textillate({initialDelay: 5600, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#number-2').textillate({initialDelay: 5600, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });
$('#description').textillate({initialDelay: 5600, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });

// $('.xt h1').textillate({initialDelay: 1500, in: { effect: 'fadeInUp',delayScale:1, delay: 40 } });




