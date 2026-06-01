document.addEventListener("DOMContentLoaded", ()=>{
  const thirdCounter = document.querySelector(".third-counter")
  for(let i = 0; i < 2; i++){
    for(let j = 0; j < 10; j++){
      const div = document.createElement('div')
      div.className = 'num'
      div.textContent = j
      thirdCounter.appendChild(div)
    }
  }
  const finalDiv = document.createElement("div")
  finalDiv.className = 'num'
  finalDiv.textContent = "0"
  thirdCounter.appendChild(finalDiv)

  function animate (counter, duration, delay = 0, ){
    const numHeight = counter.querySelector(".num").clientHeight
    const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight

    gsap.to(counter,{
      y: -totalDistance,
      duration: duration,
      delay: delay,
      ease: "power2.inOut"
    })
  }
  animate(thirdCounter, 5)
  animate(document.querySelector(".second-counter"), 6)
  animate(document.querySelector(".first-counter"), 2, 4)
})

gsap.to('.counter',{
  top: "-150px",
  stagger:{
    amount: 0.25
  },
  delay: 6,
  duration: 1,
  ease: "power4.inOut"
})

gsap.from('.first-loader',{
  width: 0,
  duration: 4,
  ease: "power2.inOut"
})
gsap.from('.second-loader',{
  width: 0,
  delay: 2.5,
  duration: 4,
  ease: "power2.inOut"
})
gsap.to('.loader',{
  background: "none",
  delay: 6,
  duration: 0.1,
  ease: "power3.inOut"
})

gsap.to('.first-loader',{
  rotate: 90,
  y: -50,
  duration: 0.5,
  delay: 6,
  ease: "power2.inOut"
})

gsap.to('.second-loader',{
  x: -75,
  y: 75,
  duration: 0.5,
}, "<")

gsap.to('.loader',{
  scale: 40,
  delay: 7,
  duration: 1,
  ease: "power3.inOut"
})

gsap.to('.loader',{
  rotate: 45,
  y:500,
  x: 2000,
  delay: 7,
  duration: 1,
  ease: "power3.inOut"
})

gsap.to('.loading',{
  opacity: 0,
  duration: 0.5,
  delay: 7.5,
  onComplete: ()=> {
    document.querySelector('.loading').classList.add('not-active');
  }
})

gsap.to(".header-animate", {
  duration: 3, 
  scrambleText:{
    text:"ScrambleText allows you to animate the scrambling of text.", 
    chars:"lowerCase", 
    revealDelay:0.5, 
    tweenLength:false
  }})