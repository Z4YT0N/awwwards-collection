

let tl = gsap.timeline();

tl.from("#loader h2" , {
    x:50,
    opacity:0,
    stagger:0.2
})


tl.to("#loader h2" , {
    x:10,
    opacity:0,
    stagger:0.1
})


tl.to("#loader " , {
    y:"-100%",
    duration:1
    
})


tl.from("#page1 #company-name span h1",{
    y:600,
    stagger:0.1
});

tl.from("#footer #part2 #company-name span h1",{
    y:-400,
    stagger:0.1,
    opacity:0,
    scrollTrigger:{
        // markers:true,
        trigger:"#footer",
        scrub:4,
        scroller:"#main",
        // markers:true,
        start:"top: 20%",
        end:"top 10%"

    }

});

// tl.from("",{
//     y:100
// });

tl.from("#txt-wrapper.one #slogan div p ,#txt-wrapper.one  #txt  div p",{
    y:100,
    stagger:0.2,
    scrollTrigger:{
        // markers:true,
        scroller:"#main",
        trigger:"#txt-wrapper.one #txt div",
        start:"top 85%",
        end:"top 35%",
        scrub:3
        

    }
    
});


tl.from("#txt-wrapper.two #slogan div p ,#txt-wrapper.two  #txt  div p",{
    y:100,
    stagger:0.2,
    scrollTrigger:{
        // markers:true,
        scroller:"#main",
        trigger:"#txt-wrapper.two #txt div",
        start:"top 85%",
        end:"top 35%",
        scrub:3
        

    }
    
});


tl.from("#txt-wrapper.three #slogan div p ,#txt-wrapper.three  #txt  div p",{
    y:100,
    stagger:0.2,
    scrollTrigger:{
        // markers:true,
        scroller:"#main",
        trigger:"#txt-wrapper.three #txt div",
        start:"top 85%",
        end:"top 35%",
        scrub:3
        

    }
    
});


tl.from("#page3 h1",{
    y:100, 
    stagger: 0.2,
    opacity: 0,
    
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page3",
       
        start:"top 100%",
        end:"top 30%",
        scrub:5
    }
})
