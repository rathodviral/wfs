window.onload = function () {
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsiveClass: true,
    autoWidth: false,
    center: false,
    items: 4,
    responsive: {
      0: {
        items: 1,
        center: true
      },
      768: {
        items: 1
      },
      1280: {
        items: 2,
        mergeFit: true,
        autoWidth: false
      }
    }
  });

  function updateArrowColors() {
    let totalItems = owl.find(".owl-item").length;
    let visibleItems = owl.find(".owl-item.active").length;
    let firstActiveIndex = owl.find(".owl-item.active").first().index();
    let lastActiveIndex = owl.find(".owl-item.active").last().index();
    console.log(totalItems, firstActiveIndex, lastActiveIndex);
    // Check if the first or last item is visible
    if (firstActiveIndex === 0) {
      $("#owl-prev img").css("filter", "invert(0.5)");
    } else {
      $("#owl-prev img").css("filter", "invert(0)"); // Replace with your original background
    }

    if (lastActiveIndex === 3) {
      $("#owl-next img").css("filter", "invert(0.5)");
    } else {
      $("#owl-next img").css("filter", "invert(0)"); // Replace with your original color
    }
  }

  let owl = $(".owl-carousel");

  $("#owl-next").click(function (e) {
    owl.trigger("next.owl.carousel");

    const currentActive = owl.find(".owl-item.active");
    if (window.innerWidth > 1279) {
      $(".owl-dot:not(.active)").click();
      $(".owl-dot:not(.active)").click();

      owl.trigger("next.owl.carousel");
    }
    updateArrowColors();
    carouselMakeHiddenItems();
    // findActiveImage()
    //  document.querySelector('.owl-item.active.center .item img').focus()
  });
  $("#owl-prev").click(function () {
    owl.trigger("prev.owl.carousel");

    if (window.innerWidth > 1279) {
      $(".owl-dot:not(.active)").click();
      $(".owl-dot:not(.active)").click();
      owl.trigger("prev.owl.carousel");
    }
    updateArrowColors();
    // new

    // Update arrows initially
    updateArrowColors();

    carouselMakeHiddenItems();
    // findActiveImage()
    // document.querySelector('.owl-item.active.center .item img').focus()
  });

  carouselMakeHiddenItems();
};

function carouselMakeHiddenItems() {
  document.querySelectorAll(".owl-item").forEach((el) => {
    if (!el.classList.contains("active")) {
      el.setAttribute("aria-hidden", "true");
    } else {
      el.removeAttribute("aria-hidden");
    }
  });
}

// function findActiveImage() {
//   const items = document.querySelectorAll('.owl-item.active.center .item img');

// items.forEach((item) => {
//   item.setAttribute('tabindex', '0');
// });

// const allOtherItems = document.querySelectorAll(
//   '.owl-item:not(.active.center) .item img'
// );

// allOtherItems.forEach((item) => {
//   item.removeAttribute('tabindex');
// });
// }

const accordions = document.getElementsByClassName("accordion");

[...accordions].forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");
    const panel = accordion.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
    const icon = accordion.querySelector(".accordion-icon");
    icon.classList.toggle("plus-icon");
    icon.classList.toggle("minus-icon");
    if (accordion.classList.contains("active")) {
      accordion.setAttribute("aria-expanded", "true");
    } else {
      accordion.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // const doc = content.contentDocument
  // let svg = doc.querySelector('svg');
  // let styleElement = document.querySelector('svg defs style');
  // console.log('ahaha', content.contentDocument)
  // const additionalCss = `.anim-fri-swipe, .anim-thur-swipe, .anim-wed-swipe, .anim-arrow_rotate, .anim-early-pay-day-swipe, .anim-pay-day-swipe {
  //   animation-play-state: running;
  // }`
  // if (doc) {

  //   doc.querySelector('defs style').textContent += additionalCss;
  // }
  // console.log(svg.querySelector('defs style').style)
  // styleElement.textContent += additionalCss;
  // const element = document.querySelector('.aninmatedsvgs')
  // const contentTopCheck = element.getBoundingClientRect().top;
  // const screenHeightCheck = window.innerHeight;

  // if (
  //   contentTopCheck < screenHeightCheck
  // ) {
  //     animateSVG()
  // } else {
  //   window.addEventListener('scroll', () => {
  //     animateImages();
  //    animateSVG()
  //   });
  // }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("clock-icon")) {
            setTimeout(() => {
              [
                ...entry.target.contentDocument.querySelectorAll(
                  '[class*="anim"]'
                )
              ].forEach((item) => (item.style.animationPlayState = "running"));
            }, 1000);
          } else {
            [
              ...entry.target.contentDocument.querySelectorAll(
                '[class*="anim"]'
              )
            ].forEach((item) => (item.style.animationPlayState = "running"));
          }
          animateImages();
        }
      });
    },
    { threshold: 0.5 }
  ); // Adjust threshold as needed

  const animatedElement = document
    .querySelectorAll(".aninmatedsvgs")
    .forEach((el) => {
      observer.observe(el);
    });
});

function animateSVG() {
  document.querySelectorAll(".aninmatedsvgs").forEach((svgElem) => {
    const contentTop = svgElem.getBoundingClientRect().top + 100;
    const screenHeight = window.innerHeight;

    if (contentTop < screenHeight) {
      [...svgElem.contentDocument.querySelectorAll('[class*="anim"]')].forEach(
        (item) => (item.style.animationPlayState = "running")
      );
    } else {
      [...svgElem.contentDocument.querySelectorAll('[class*="anim"]')].forEach(
        (item) => (item.style.animationPlayState = "pause")
      );
    }
  });
}

function animateImages() {
  document
    .querySelectorAll(".section__4__banking__columns-card-left")
    .forEach((el, index) => {
      const contentTop = el.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (contentTop < screenHeight) {
        if (index === 0) {
          el.classList.add("animate__animated", "animate__fadeInLeft");
        } else if (index === 1) {
          el.classList.add("animate__animated", "animate__fadeInRight");
        } else if (index === 2) {
          el.classList.add("animate__animated", "animate__fadeInUp");
        }
      }
    });
}

window.addEventListener("scroll", function () {
  let footer = document.querySelector(".footer-sticky");
  if (window.scrollY > 200) {
    footer.style.opacity = "1";
    footer.style.visibility = "visible";
  } else {
    footer.style.opacity = "0";
    footer.style.visibility = "hidden";
  }
});

const input = document.querySelector("#emailaddress");

input.addEventListener("focusout", () => {
  const spanError = document.querySelector("#emailaddress-error");
  const labelerror = document.querySelector(".emailaddress_label.active");

  if (spanError && !spanError.classList.contains("valid")) {
    labelerror && labelerror.classList.add("error");
  } else {
    labelerror && labelerror?.classList.remove("error");
  }
});

setTimeout(() => {
  const buttons = document.querySelectorAll('button[role="button"].owl-dot');
  buttons.forEach((el) => {
    el.setAttribute("aria-label", "change slide");
  });
}, 100);
