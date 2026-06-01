//                        JAY SHREE KRISHNA             >>>>       RADHE RADHE



                                        console.log('Jay Shree Krishna !');



//          <-----------------              <<<<<<<<         -       PROGRAMMING    -   >>>>>>>>>>                  ---------------->


//                  <<<<<<!------                            VIDEO PLAY CURSOR MAKING                           ------------>>>>

//                  <<<<<                                       LOCOMOTIVE JS CODE                                        >>>>

function locomotiveAnimation(){
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
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

};
locomotiveAnimation();

gsap.to('.nav-1 svg', {
    transform: 'translateY(-100%)',
    scrollTrigger: {
        trigger: '.page-1',
        scroller: '#main',
        scrub: true,
        start: 'top 0',
        end: 'top -5%',
    }
});

gsap.to('#nav-links', {
    transform: 'translateY(-100%)',
    opacity: 0,
    scrollTrigger: {
        trigger: '.page-1',
        scroller: '#main',
        scrub: true,
        start: 'top 0',
        end: 'top -5%'
    }
})

//                     <<<<<<<                             VIDEO COINTAINER                           >>>>>>>>        

function videocon() {
    let contain = document.querySelector('.video-container');
    let circle = document.querySelector('.play');

    // CONTAINER EVENT HANDLING
    contain.addEventListener('mousemove', function(event) {
        // Calculate the cursor's position relative to the video container
        let x = event.clientX - contain.getBoundingClientRect().left;
        let y = event.clientY - contain.getBoundingClientRect().top;

        // Set the position of the custom cursor
        gsap.to(circle, {
            left: x - circle.offsetWidth / 2 + 'px',
            top: y - circle.offsetHeight / 2 + 'px',
        });
    });

    // MOUSE ENTER SCRIPTING
    contain.addEventListener('mouseenter', function() {
        gsap.to(circle, {
            opacity: 1,
            scale: 1,
        });
    });

    // MOUSE LEAVE SCRIPTING
    contain.addEventListener('mouseleave', () => {
        gsap.to(circle, {
            opacity: 0,
            scale: 0,
        });
    });
}
videocon();

//                 <<<<<<<<<<<!-----                              PAGE ANIMATION                         ------->>>>>>>>>>

function pageanimate (){
    gsap.from('.page-1 h1', {
        y: 40,
        opacity: 0,
        delay: 0.3,
        duration: 0.5,
        stagger: 0.2
    });
    gsap.from('.video-container', {
        y: 20,
        opacity:0,
        delay: 0.8,
        duration: 0.4,
        filter: blur(40)
    });
};
pageanimate();
//                                                            CONTAINER POINTER CURSOR

document.addEventListener('mousemove', function(dets){
    gsap.to('#cursor', {
        x: dets.x,
        y: dets.y
    });
});

document.querySelectorAll('.container').forEach(function(elem){
    elem.addEventListener('mouseenter', function(){
        gsap.to('#cursor', {
            opacity: 1,
            scale: 1
        });
    });
    elem.addEventListener('mouseleave', function(){
        gsap.to('#cursor', {
            opacity: 0,
            scale: 0
        });
    });
});

//                                                            NAV-BAR LINKS EFFECTS


let a = document.querySelectorAll('.zero');
a.forEach(function(elem){
    elem.addEventListener('mouseenter', function(){
        elem.className = 'zero hero';
    });
    elem.addEventListener('mouseleave', function(){
        elem.className = 'zero';
    });
    
});