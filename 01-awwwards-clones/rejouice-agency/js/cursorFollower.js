let playReel =  document.querySelector("#playreel");
let takeOne = document.querySelector("#playreel.take-one");

let page1 = playReel.parentNode;

let page2 = takeOne.parentNode;
console.log(page2);

// console.log(page2)
// let handleMouseMove = (dets) =>{
//     playReel.style.left = dets.x +  "px";
//     playReel.style.top = dets.y +  "px";
// }

// page1.addEventListener("mousemove", handleMouseMove);
let handleMousemove = (dets) => { 
    // console.log(dets);
    gsap.to(playReel,{
        x:dets.pageX,
        y:dets.pageY,
        scale:1
    })
}




let handleMouseEnter = ()=>{
    gsap.to(playReel,{
        scale:1
    })
   
}

let handleMouseLeave = ()=>{
    gsap.to(playReel,{
        scale:0
    })
}


let handleMousemove2 = (dets) => { 
    // console.log(dets);
    gsap.to(takeOne,{
        x:dets.pageX,
        y:dets.pageY,
        scale:1
    })
}




let handleMouseEnter2 = ()=>{
    gsap.to(takeOne,{
        scale:1
    })
   
}

let handleMouseLeave2 = ()=>{
    gsap.to(takeOne,{
        scale:0
    })
}


page1.addEventListener("mousemove" , handleMousemove);



page1.addEventListener("mouseenter" , handleMouseEnter);
page1.addEventListener("mouseleave" , handleMouseLeave);


page2.addEventListener("mousemove" , handleMousemove2);



page2.addEventListener("mouseenter" , handleMouseEnter2);
page2.addEventListener("mouseleave" , handleMouseLeave2);