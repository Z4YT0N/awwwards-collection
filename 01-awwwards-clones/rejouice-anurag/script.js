function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

function cursorAnimation(){

    var page = document.querySelector("#page1-content");
    var cursor = document.querySelector("#cursor");

    page.addEventListener("mousemove",function(dets){
        gsap.to(cursor ,{
         x:dets.x,
         y:dets.y,
        })
    })

    page.addEventListener("mouseleave", function(){
        gsap.to(cursor, {
         scale: 0,
         opacity:0
        })
    })

    page.addEventListener("mouseenter", function(){
        gsap.to(cursor, {
         scale: 1,
         opacity:1
        })
    })

}
cursorAnimation();

function page2Animation(){
    gsap.from("#page2 p",{
        y:120,
        opacity:0,
        duration:0.3,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"main",
            start:"top 40%",
            end:"bottom 90%",
            scrub:1,
        }
    })
}
page2Animation();

function swiperJs(){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}
swiperJs();

function intro(){

  var tl = gsap.timeline();

  tl.from("#intro h1", {
    x: 200,
    opacity:0,
    delay:0.2,
    duration: 1.3,
  })
  tl.to("#intro h1", {
    x:-10,
    opacity:0,
    duration: 0.8,
  })
  tl.to("#intro", {
    opacity:0,
    duration: 0.8,
    display:"none"
  })
} intro();

gsap.from("#page1 h1 span",{
  y:100,
  opacity:0,
  stagger:0.1,
  duration:0.5,
  ease: "power1.out",
  delay:2.3,
})

gsap.from("#page5-foot h1",{
  y:-200,
  duration:0.6,
  opacity:0,
  scrollTrigger:{
    scrub:1,
    trigger:"footer",
    scroller:"main",
    start:"top 40%",
    end:"bottom 90%",
}
})