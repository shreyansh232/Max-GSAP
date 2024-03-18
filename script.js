const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const firstPageAnim = () => {
  let tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      stagger: 0.2,
      delay: -1,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
};
firstPageAnim();

var timeout;
const circleSkew = () => {
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    this.clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = this.setTimeout(function () {
      document.querySelector("#minicircle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100); // console.log(xdiff, ydiff);
    // this.document.querySelector("#minicircle").style.transform =
    //   `translate(${details.clientX}px, ${details.clientY}px) skew(10deg, 10deg)`;
  });
};

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform =
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleSkew();

circleMouseFollower();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 0, diffrot*0.5),
    });
  });
});

function updateMonacoTime() {
  var now = new Date();
  var options = { timeZone: 'Europe/Monaco', hour12: true, hour: 'numeric', minute: '2-digit' };
  var monacoTime = now.toLocaleTimeString('en-US', options);
  document.getElementById('monacoTime').textContent = monacoTime;
}

// Update time immediately and then every second
updateMonacoTime();
setInterval(updateMonacoTime, 1000);


