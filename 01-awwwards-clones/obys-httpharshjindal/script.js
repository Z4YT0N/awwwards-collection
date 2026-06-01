async function locomotiveanime(){
    gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
 
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}
function loaderanime(){
        
    var tl = gsap.timeline()

    tl.from(".line h1",{
        y:150,
        opacity:0,
        stagger:.25,
        duration:.8,
        delay:.1
    })
    tl.from(".line #counter, .line h6, #plswait h4",{
        opacity:0,
        onStart:function(){
            var countertext = document.querySelector("#counter-value")
            var counter = 0;

            var couInt= setInterval(function(){
            counter++;
            if(counter>100){
                clearInterval("couInt");
            }
            else{
            countertext.textContent = counter;
                }  
            },20);
        }
    })
    tl.to(".line h6",{
        animationName: "strokeanime",
    })

    tl.to("#loader .line, #plswait h4",{
        opacity:0,
        duration:2,
        delay:3,
        stagger:.2,

    })
    tl.from("#page1, #page2, #page3, #page4",{
        y:1600,
        duration:1.5,
        opacity:0,
        ease:"power2.inout",
    },"-=1.5")

    tl.from("#nav",{
        opacity:1,
        y:-200
    })
    tl.from(".text h1",{
        opacity:0,
        y:200,
        duration:1.5,
        stagger:0.2,
    },"-=1.5")
}

function slinein(e){

    gsap.from(e,{
        y:1600,
        duration:1.5,
        opacity:0,
        ease:"power2.inout",
    })
}

function cursoranime(){
    
    Shery.makeMagnet("#part-2 h2 , #part-1 div svg", {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
        
      });
    Shery.mouseFollower({
        //Parameters are optional.
        skew:false,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration:.5 ,

      });

}

function playicon(){
    var videocont = document.querySelector("#vidcont")
var video = document.querySelector("#vidcont video")

videocont.addEventListener("mouseenter", function(){
    videocont.addEventListener("mousemove", function(det){
        gsap.to(".mousefollower",{
            opacity:0
        })
        gsap.to("#playbtn",{
            y:det.y - 100,
            x:det.x - 1110,
        })
    })
})

videocont.addEventListener("mouseleave",function(){
    gsap.to(".mousefollower",{
        opacity:1
    })
    gsap.to("#playbtn",{
        y:"15",
        x:"12%",  
    })
})

var flag = 0
videocont.addEventListener("click",function(){
    if(flag == 0){
        video.play();
        video.style.opacity = 1;
        gsap.to("#playbtn",{
            scale:0.5,
        })
        document.querySelector("#playbtn").innerHTML = `<i class="ri-pause-mini-line" id="playicon"></i>`
        flag = 1
    }
    else{
        video.pause();
        video.style.opacity = 0;
        gsap.to("#playbtn",{
            scale:1,
        })
        document.querySelector("#playbtn").innerHTML = `<i class="ri-play-fill" id="playicon"></i>`
        flag = 0;
    }
    
})


}

function sherygoeyeffect(){
    Shery.imageEffect(".img-div" , {
        style:6, //Select Style
        debug:false, // Debug Panel
        config:
        {"noiseDetail":{"value":7.44,"range":[0,100]},"distortionAmount":{"value":2.98,"range":[0,10]},"scale":{"value":36.36,"range":[0,100]},"speed":{"value":0.79,"range":[0,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8000140785583556},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":-0.010752688172043001}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.52,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":28.94},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.68,"range":[0,10]},"metaball":{"value":0.43,"range":[0,2]},"discard_threshold":{"value":0.53,"range":[0,1]},"antialias_threshold":{"value":0.03,"range":[0,0.1]},"noise_height":{"value":0.44,"range":[0,2]},"noise_scale":{"value":9.92,"range":[0,100]},"uColor":{"value":false},"uSpeed":{"value":0.3,"range":[0.1,1],"rangep":[1,10]},"uAmplitude":{"value":1.98,"range":[0,5]},"uFrequency":{"value":5.24,"range":[0,10]}},
        gooey:true, //its a efect
        preset: "./presets/wigglewobble.json",
      });
      
}

function flaganimaiton(){
    var flagdiv = document.querySelector("#web-graphic")
    var flag = document.querySelector("#flag")
    flagdiv.addEventListener("mouseenter",function(){
        document.addEventListener("mousemove",function(dets){
            flag.style.opacity = 1;
            gsap.to("#flag",{
                x:dets.x -200,
                y:dets.y - 200,
            })
        })
    })

    flagdiv.addEventListener("mouseleave",function(){
        document.addEventListener("mousemove",function(dets){
            flag.style.opacity = 0;
            gsap.to("#flag",{
                x:dets.x -200,
                y:dets.y -200,
            })
        })
    })

}
function h1textanimation(){

    var headings = document.querySelectorAll(".heading h1")
    headings.forEach(function(elem){
        elem.addEventListener("mouseenter",function(dets){  
            var h1anime = $(elem).textillate({ minDisplayTime:200 ,delayScale:.5, in: { effect: 'fadeIn'}});
            h1anime.textillate('in')
        })
        elem.addEventListener("mouseleave",function(dets){
            var h1anime = $(elem).textillate({ minDisplayTime:200 ,delayScale:.5, in: { effect: 'fadeIn', reverse:true}});
            h1anime.textillate('in')
        })
    })
}

function projectheading(){
var projheading = document.querySelectorAll(".rolltext")
projheading.forEach(function(elem){
    elem.addEventListener("mouseenter",function(dets){ 
        var projanime = $(dets.target).textillate({minDisplayTime:0.005, in: { effect: 'fadeInUp', sync:true} , out: { effect: 'fadeInDown' , sync:true }});
        projanime.textillate('in')
        elem.style.overflow = "hidden"
    })
    elem.addEventListener("mouseleave",function(dets2){
        var projanime2 = $(dets2.target).textillate({in: { effect: 'fadeInDown', sync:true}});
        projanime2.textillate('in')
        elem.style.overflow = "hidden"
    })
})
}



loaderanime();
projectheading();
sherygoeyeffect();
playicon();
flaganimaiton();

function screen_resize() {
    var h = window.innerHeight;
    var w = window.innerWidth;

    if(w <= 600) {
    } else {
        cursoranime();
    }
}
screen_resize()
