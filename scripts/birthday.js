// scripts/birthday.js

// Ask permission to play background music, then run animation
window.addEventListener("load", () => {
  Swal.fire({
    title: "Do you want to play music in the background?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, play",
    cancelButtonText: "No, thanks"
  }).then((result) => {
    if (result.isConfirmed) {
      const song = document.querySelector(".song");
      // Attempt to play; browsers may still block without user gesture, but this is safest
      song.play().catch((e) => {
        // ignore play exception; animation continues
        console.warn("Autoplay prevented:", e);
      });
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

const animationTimeline = () => {
  // select elements
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  // wrap chars in spans for stagger animations
  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  }
  if (hbd) {
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;
  }

  // common transform values (used via individual tweens)
  const ideaIn = { opacity: 0, y: -18, rotationX: 4, skewX: "12deg", duration: 0.8, ease: "power2.out" };
  const ideaOut = { opacity: 0, y: 18, rotationY: 4, skewY: "-10deg", duration: 0.8, ease: "power2.inOut" };

  // create timeline (GSAP v3)
  const tl = gsap.timeline();

  // reveal container
  tl.to(".container", { duration: 0.6, css: { visibility: "visible" } })

    // entrance of title and subtitle
    .from(".one", { duration: 0.9, opacity: 0, y: 12, ease: "power2.out" })
    .from(".two", { duration: 0.7, opacity: 0, y: 10, ease: "power2.out" }, "-=0.3")

    // hold a bit then fade out title/sub
    .to(".one", { duration: 0.9, opacity: 0, y: 12, ease: "power2.inOut" }, "+=3.8")
    .to(".two", { duration: 0.8, opacity: 0, y: 12, ease: "power2.inOut" }, "-=0.7")

    // show "it's your birthday"
    .from(".three", { duration: 0.9, opacity: 0, y: 12, ease: "power2.out" })
    .to(".three", { duration: 0.9, opacity: 0, y: 12, ease: "power2.inOut" }, "+=3.5")

    // chatbox appears
    .from(".four", { duration: 0.9, scale: 0.85, opacity: 0, ease: "elastic.out(1, 0.6)" })
    .from(".fake-btn", { duration: 0.6, scale: 0.8, opacity: 0, ease: "back.out(1.2)" }, "-=0.45")

    // reveal chatbox text slowly (gentle stagger)
    .to(".hbd-chatbox span", {
      duration: 1.3,
      visibility: "visible",
      stagger: 0.04,
      ease: "power2.out"
    }, "+=0.35")

    // fake button highlight after some seconds
    .to(".fake-btn", { duration: 0.2, backgroundColor: "rgb(255, 183, 208)" }, "+=4.5")

    // lift chatbox away
    .to(".four", { duration: 0.6, scale: 0.7, opacity: 0, y: -180, ease: "power2.in" }, "+=1.2")

    // idea lines in & out, paced slower to match slow romantic tempo
    .from(".idea-1", ideaIn)
    .to(".idea-1", ideaOut, "+=4")
    .from(".idea-2", ideaIn)
    .to(".idea-2", ideaOut, "+=4")
    .from(".idea-3", ideaIn)
    .to(".idea-3 strong", { duration: 0.6, scale: 1.05, x: 8, backgroundColor: "rgb(255, 199, 220)", color: "#8a0f2b" }, "-=0.2")
    .to(".idea-3", ideaOut, "+=4")

    .from(".idea-4", ideaIn)
    .to(".idea-4", ideaOut, "+=3.5")

    // big affectionate line
    .from(".idea-5", { duration: 0.9, rotationX: 10, rotationZ: -6, skewY: "-4deg", y: 40, opacity: 0, ease: "power2.out" }, "+=1.2")
    .to(".idea-5 span", { duration: 0.8, rotation: 90, x: 6, ease: "power1.out" }, "+=1.2")
    .to(".idea-5", { duration: 0.7, scale: 0.9, opacity: 0, ease: "power2.in" }, "+=2.2")

    // big letters animation (slow and proud)
    .from(".idea-6 span", {
      duration: 1.0,
      scale: 2.8,
      opacity: 0,
      rotation: 12,
      ease: "elastic.out(1, 0.6)",
      stagger: 0.25
    })
    .to(".idea-6 span", {
      duration: 1.0,
      scale: 2.8,
      opacity: 0,
      rotation: -12,
      ease: "elastic.in(1, 0.6)",
      stagger: 0.25
    }, "+=1.2")

    // balloons floating (slower)
    .fromTo(".ballons img", {
      opacity: 0.95,
      y: 1400
    }, {
      opacity: 1,
      y: -1100,
      duration: 5.5,
      stagger: 0.35,
      ease: "power1.out"
    }, "-=0.6")

    // profile and hat entrance
    .from(".profile-picture", { duration: 0.8, scale: 3.2, opacity: 0, x: 22, y: -22, rotationZ: -36, ease: "back.out(1.2)" }, "-=4.5")
    .from(".hat", { duration: 0.7, x: -80, y: 300, rotation: -180, opacity: 0, ease: "back.out(1.2)" }, "-=4.2")

    // wish headline (letter by letter)
    .from(".wish-hbd span", {
      duration: 0.85,
      opacity: 0,
      y: -36,
      rotation: 80,
      skewX: "22deg",
      ease: "elastic.out(1, 0.6)",
      stagger: 0.09
    }, "-=3.6")
    .to(".wish-hbd span", {
      duration: 0.7,
      scale: 1,
      rotationY: 0,
      color: "#ff6f9f",
      ease: "expo.out",
      stagger: 0.08
    }, "party")

    // wish text appear
    .from(".wish-text", { duration: 0.7, opacity: 0, y: 12, skewX: "-8deg", ease: "power2.out" }, "party")

    // decorative circles expand (gentle pulses)
    .to(".eight svg", {
      duration: 1.6,
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 2,
      repeatDelay: 1.4,
      stagger: 0.35,
      ease: "power1.out"
    }, "+=0.4")

    // fade six to reveal final lines
    .to(".six", { duration: 0.6, opacity: 0, y: 28, zIndex: -1, ease: "power2.in" }, "+=1.4")

    // final messages
    .from(".nine p", { duration: 1.0, opacity: 0, y: -18, ease: "power2.out", stagger: 1.2 })
    .to(".last-smile", { duration: 0.5, rotation: 90, ease: "power2.out" }, "+=1");

  // replay button restarts timeline
  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
    });
    // keyboard accessibility
    replyBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") tl.restart();
    });
  }

  // also make fake-btn clickable to restart (small UX)
  const fakeBtn = document.querySelector(".fake-btn");
  if (fakeBtn) {
    fakeBtn.addEventListener("click", () => tl.restart());
    fakeBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") tl.restart();
    });
  }
};
