document.addEventListener("DOMContentLoaded", function() {
    gsap.to(".log-container", {duration: 1.7, y:"100%", scale:1, ease:"bounce.out"});
    gsap.to(".social", {duration: 5.5, x:"250%", ease:"power4.out"}) ;
    let tl = gsap.timeline({repeat: 0});
    tl.to(".img", {scale:1.2, duration: 6, ease:"power2.inOut"});
    tl.to(".img", {scale:1, duration:10, ease:"power2.inOut"}, ">+=3");
})
