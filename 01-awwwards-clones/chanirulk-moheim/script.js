gsap.to("#welcome", {
    opacity: 0,
    ease: Expo.easeInOut(),
    duration: 10,
    y: -2000,
    delay: 1.5,
})

gsap.from("#main", {
    opacity: 0,
    ease: Expo.easeInOut(),
    duration: 5,
    delay: 1,
})

gsap.to("#maintext", {
    scrollTrigger: {
        trigger: "#one",
        // markers: true,
        start: "110% 100%",
        end: "150% 150%",
        scrub: 3,
    },
    y: -500,
    ease: Expo.easeInOut(),
    duration: 10,
})

gsap.to("#one", {
    scrollTrigger: {
        trigger: "#one",
        // markers: true,
        start: "130% 100%",
        end: "150% 150%",
        scrub: 3,
    },
    opacity: 0,
    ease: Expo.easeInOut(),
    duration: 5,
})

gsap.to("#newsletter", {
    scrollTrigger: {
        trigger: "#one",
        // markers: true,
        start: "70% 100%",
        end: "110% 110%",
        scrub: 3,
    },
    x: 500,
    ease: Expo.easeInOut(),
    duration: 10,
})

gsap.from("#twotxt", {
    scrollTrigger: {
        trigger: "#twotxt",
        // markers: true,
        start: "10% 50%",
        end: "50% 80%",
        // scrub: 3,
    },
    y: 100,
    opacity: 0,
    ease: Expo.easeInOut(),
    duration: 3,
})

gsap.from(".designer", {
    scrollTrigger: {
        trigger: ".designer",
        // markers: true,
        start: "10% 50%",
        end: "60% 80%",
        // scrub: 3,
    },
    y: 100,
    opacity: 0,
    ease: Expo.easeInOut(),
    duration: 2,
})

document.querySelector("#newsletter").addEventListener('mousemove', function(){
    document.querySelector(".ri-mail-line").style.display = "none"
    document.querySelector(".ri-send-plane-fill").style.display = "initial"
    // document.querySelector(".ri-send-plane-fill").style.rotate = "360deg"
})

document.querySelector("#newsletter").addEventListener('mouseleave', function(){
    document.querySelector(".ri-mail-line").style.display = "initial"
    document.querySelector(".ri-send-plane-fill").style.display = "none"
})



let aboutTl = gsap
  .timeline({
    paused: true
  })
  .from("#slideshow", {
    duration: 50,
    ease: Expo.easeInOut(),

  })
  .to("#slideshow",{
      x: -3000,
      duration: 50,
      ease: Expo.easeInOut(),
  })


  ScrollTrigger.create({
    animation: aboutTl,
    trigger: "#slideshow",
    start: "top 10%",
    end: "=300%",
    scrub: 3,
    // markers: true,
    pin: true,
    id: "#four",
    duration: 50,
  });


  document.querySelector("#slideshow")
  .addEventListener("mousemove", function(dets){
          document.querySelector("#circle").style.top= `${dets.clientY}px`
          document.querySelector("#circle").style.left= `${dets.clientX}px`
          document.querySelector("#circle").style.opacity= 1;
          document.querySelector("#circle").style.mixBlendMode= "difference"
          document.querySelector("#circle").style.transform = "translate(-50%, -50%)"
  });

  document.querySelector("#slideshow")
  .addEventListener("mouseout", function(dets){
          document.querySelector("#circle").style.top= `${dets.clientY}px`
          document.querySelector("#circle").style.left= `${dets.clientX}px`
          document.querySelector("#circle").style.opacity= 0;
          document.querySelector("#circle").style.transform = "translate(-50%, -50%)"
      
  });

