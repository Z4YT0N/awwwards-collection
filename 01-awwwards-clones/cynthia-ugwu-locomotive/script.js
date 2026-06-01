var timeout;
// import LocomotiveScroll from 'locomotive-scroll.min.js';


const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingtext", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
    //   ease: Power3,
    //   top: diff - elem.querySelector("img").height/2,
    top: diff,
    //   left: dets.clientX - elem.querySelector("img").width/2,
    left:dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

//MAKING SURE THAT IMAGES ARE DEFINITELY DISABLED
document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mousemove",function(details){
        if(details.clientY>elem.getBoundingClientRect().bottom || details.clientY<elem.getBoundingClientRect().top){
            gsap.to(elem.querySelector("img"),{
                opacity:0,
            })
        }
    })
})

// // LOCOMOTIVE SCROLL
// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
// });

// //MOUSE FOLLOWER
// function circleMouseFollower() {
//   window.addEventListener("mousemove", function (dets) {
//     document.querySelector(
//       "#minicircle"
//     ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
//   });
// }

// circleMouseFollower();

//JAB MOUSE MOVE KARE, TAB CIRCLE CHAPTA HO JAAYE JO MOUSE KO FOLLOW KR RHA HAI. JAB HAM MOVE KRNA BAND KRDE TAB WOH CHAPTA HONE BAND KRDE
//ALSO WE NEED TO TAKE CARE KI EK LIMIT TAK CHAPTA HO. YE NHI KI BAHOT TEZZ MOUSE MOVE KRE TOH WOH CIRLCE EK STRAIGHT LINE HI BANN JAAYE
// function circleChaptaKaro(){
//     var xscale = 1;
//     var yscale = 1; 
//     var xprev = 0;
//     var yprev = 0;
//     window.addEventListener("mousemove",function(details){
//         var xdiff = details.clientX-xprev;
//         var ydiff = details.clientY-yprev;
//         xscale = gsap.utils.clamp(0.8,1.2,xdiff)
//         yscale = gsap.utils.clamp(0.8,1.2,ydiff)

//         xprev = dets.clientX;
//         yprev = dets.clientY;
        
//         document.querySelector(
//             "#minicircle"
//           ).style.transform = `scale(${xscale},${yscale})`;
//     })
// }

// circleChaptaKaro();

//FIRST PAGE ANIMATION
// function firstPageAnim() {
//   var t1 = gsap.timeline();
//   t1.from("#nav", {
//     y: "-10",
//     opacity: 0,
//     duration: 1.5,
//     ease: Expo.easeInOut,
//   })
//     .to(".boundingtext", {
//       y: 0,
//       ease: Expo.easeInOut,
//       duration: 2,
//       stagger: 0.2,
//       delay: -1,
//     })
//     .from("#herofooter", {
//       y: -10,
//       opacity: 0,
//       duration: 1.45,
//       ease: Expo.easeInOut,
//       delay: -1,
//     });
// }

// firstPageAnim();

// //MOVE IMAGE IN ELEM WITH THE MOUSE POINTER
// function showImageInElem(){
//     document.querySelectorAll(".elem").forEach(function(elem){
//         elem.addEventListener("mousemove",function(details){
//             //to rotate the image when pointer is moving
//             var rotate = 0;
//             diffrot = details.clientX - rotate;
//             rotate = details.clientX;
            
//             //to get the difference of the mouse pointer's distance 
//             //from the top of the screen and elem's distance from top of the screen.
//             var difference = details.clientY-elem.getBoundingClientRect().top

//             gsap.to(
//                 elem.querySelector("img"),{
//                     opacity: 1,
//                     ease: Power1,
//                     // top:details.clientY,
//                     top: difference - elem.querySelector("img").offsetHeight/2,
//                     left:details.clientX - elem.querySelector("img").offsetWidth/2,
//                     rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
//                 }
//             )
//         })
//     })
// }

// showImageInElem();

//SIDE BAR CODE
/* Set the width of the side navigation to 250px */
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
//   document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
// }

// /* Set the width of the side navigation to 0 */
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.body.style.backgroundColor = "black";
// }



var elemlist = document.getElementsByClassName("elem")

for(var i=0;i<elemlist.length;i++){
  elemlist[i].addEventListener("mouseenter",mouseEnter)
  elemlist[i].addEventListener("mouseleave",mouseExit)
}


function mouseEnter() {
  var minicirclestyle = document.getElementById("minicircle").style;
  minicirclestyle.width = "100px"
  minicirclestyle.height = "100px"
  minicirclestyle.opacity = 1

  document.getElementById("minicircle-text").style.display = "revert";
}

function mouseExit(){
  // document.getElementById("elemfirst").style.color = "black"
  var minicirclestyle = document.getElementById("minicircle").style;
  minicirclestyle.width="15px"
  minicirclestyle.height = "15px"
  minicirclestyle.opacity = 0.5
  document.getElementById("minicircle-text").style.display = "none";
}

//SCROLLING TO A SECTION
function scrollToTarget(){
  const scroll = new LocomotiveScroll();
const target = document.querySelector('#js-target');

scroll.scrollTo(target);
  }
  
scrollToTarget();
  

function getCurrentTime(){
  var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) ;
  document.getElementById("time").innerHTML = time;
  document.getElementById("time2").innerHTML = time;
}

getCurrentTime();