var cursor = document.querySelector('#cursor');
var cursorBlur = document.querySelector('#cursor-blur');
var flag = 1;

document.addEventListener('mousemove', function (position) {
    cursor.style.left = position.x + 'px'
    cursor.style.top = position.y + 'px'
    cursorBlur.style.left = position.x - 125 + 'px'
    cursorBlur.style.top = position.y - 125 + 'px'
});

let NavChild = document.querySelectorAll('#nav h4 , #ToptraceRange, #GolfLessons, #AdventureGolf , .cards , footer');
NavChild.forEach(function (element) {
    element.addEventListener('mouseover', function () {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.border = '2px solid white';
        cursor.style.backgroundColor = 'transparent';
    });

    element.addEventListener('mouseout', function(){
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.border = 'none';
        cursor.style.backgroundColor = '#95c11e';
    });
});

gsap.to("#nav", {
    backgroundColor: "Black",
    height: "100px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 0.1
    }
});

gsap.to("#main", {
    backgroundColor: "black",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: 'top -50%',
        end: 'top -80%',
        scrub: 2
    }
});

gsap.to("#quote1" , {
    left: '12%',
    top: '24%',
    duration: 2,
    scrollTrigger: {
        trigger: "#quote1",
        scroller: "body",
        start: 'top 30%',
        end: 'top 20%',
        scrub: 1,
        // markers: true
    }
});

gsap.to("#quote2" , {
    right: '14%',
    bottom: '25%',
    duration: 2,
    scrollTrigger: {
        trigger: "#quote2",
        scroller: "body",
        start: 'top 90%',
        end: 'top 80%',
        scrub: 1,
        // markers: true
    }
});

gsap.to('#about-us' , {
    top: '0px',
    opacity: 1, 
    scrollTrigger:{
        trigger: "#about-us",
        scroller: "body",
        start: 'top 60%',
        end: 'top 45%',
        scrub: 1,
        // markers: true
    }
});

let MobileNavBar = document.querySelector('.fa-circle-chevron-down');
let MobileNav = document.querySelector('#nav');
let MobileNavCheck = 1;

MobileNavBar.addEventListener('click', function () {
    
    if (MobileNavCheck == 1) {
        MobileNavBar.style.transform = 'rotate(180deg)';  // Use 'transform' for rotation
        MobileNav.style.setProperty('height', '300px', 'important'); // Add !important to height
        MobileNavCheck = 0;
    } else {
        MobileNavBar.style.transform = 'rotate(0deg)';  // Use 'transform' for rotation
        MobileNav.style.setProperty('height', '108px', 'important'); // Add !important to height
        MobileNavCheck = 1; 
    }
});


