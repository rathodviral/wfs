function carouselMakeHiddenItems() {
  document.querySelectorAll(".owl-item").forEach((el) => {
    if (!el.classList.contains("active")) {
      el.setAttribute("aria-hidden", "true");
    } else {
      el.removeAttribute("aria-hidden");
    }
  });
}

var carouselEl = $(".owl-carousel-mobile");

$(".owl-carousel-mobile").owlCarousel({
  items: 1,
  nav: false,
  loop: true,
  dots: true
});

$(".bank-next-button").click(function () {
  carouselEl.trigger("next.owl.carousel");
});

$(".bank-previous-button").click(function () {
  carouselEl.trigger("prev.owl.carousel");
});

//   Get all the tab elements and tab descriptions
const tabs = document.querySelectorAll(".nav li");
const descriptions = document.querySelectorAll(".tabcontent");
// Add click event listener to each tab
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove the "active" class from all tabs and descriptions
    tabs.forEach((t) => t.classList.remove("active"));
    descriptions.forEach((desc) => desc.classList.remove("active"));
    // Add the "active" class to the clicked tab and the corresponding description
    tab.classList.add("active");
    descriptions[index].classList.add("active");
  });
});

jQuery(document).ready(function ($) {
  // smoothScrollLink('a.scroll[href^="#"]', 0, 0);
  $("#branchForm input#emailaddress").val("");
  /* for sticky CTA START */
  $(window).scroll(function () {
    var condCheck2 =
      $(".stick_cta").length > 0 &&
      $("#banner_message").offset().top < $(window).scrollTop();
    var condCheck2_mobile =
      $(".stick_cta").length > 0 &&
      $("#banner_message_mobile").offset().top < $(window).scrollTop();

    if ($(window).width() >= 760) {
      var condCheckFinal = condCheck2;
    } else {
      var condCheckFinal = condCheck2_mobile;
    }
    //  if(condCheckFinal)
    if (true) {
      //console.log('$(".stick_cta").offset().top',$(".stick_cta").offset().top)
      $(".sticky-content").addClass("fixed");
      // $("footer").css("padding-bottom", $(".sticky-content").outerHeight());
    } else {
      $(".sticky-content").removeClass("fixed");
    }
  });
  /* for sticky CTA END */

  scrollToElement();
  handleLinkFocus();
  onModalCloseFocus();
  onLinkOpenModal();
});

// handle back to top button
$(".to-top_btn").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    500
  );

  $("#header-logo-link").trigger("focus");
});

// Modal link
let curModalLink = null;
// Function to open a modal
function openModal(modalId) {
  const modal = $(modalId);
  const modalBg = modal.find(".wf-modal-lightbox-bg");
  const body = $("body");

  // Show the modal
  modalBg.fadeIn();
  modal.fadeIn();
  body.css("overflow", "hidden"); // Prevent scrolling
}

// Function to close a modal
function closeModal(modal) {
  const modalBg = modal.find(".wf-modal-lightbox-bg");
  const body = $("body");

  // Hide all modals
  modal.fadeOut();
  modalBg.fadeOut();
  body.removeAttr("style"); // Restore scrolling
}

// Modal close button
$(".wf-modal-lightbox-close-btn").on("click", function () {
  let modal = $(this).closest(".wf-modal-lightbox"); // Find the specific modal to close
  closeModal(modal);
});

// Close modal on ESC key
$(window).on("keydown", function (event) {
  if (event.key === "Escape") {
    $(".wf-modal-lightbox:visible").each(function () {
      modal = $(this).closest(".wf-modal-lightbox");
      closeModal(modal);
    });
  }
});

$(window).on("keydown", function (event) {
  if (event.key === "Escape") {
    $(".wf-modal-lightbox:visible").each(function () {
      let modal = $(this);
      console.log("module ----", modal);
      closeModal(modal);
    });
  }
});

// Function to close a modal
// function closeModal(modal) {
//   const modalBg = modal.find(".wf-modal-lightbox-bg");
//   const body = $("body");

//   // Hide the modal and its background
//   modal.fadeOut();
//   modalBg.fadeOut();

//   // Restore scrolling
//   // body.removeAttr("style");
//   body.css("overflow", "");
// }

// Attach click events for each link
$(".wf-modal-link_1").on("click", function (e) {
  e.preventDefault();
  openModal("#modal_1");
});

$(".wf-modal-link_2").on("click", function (e) {
  e.preventDefault();
  openModal("#modal_2");
});

$(".id_req_to_open").on("click", function (e) {
  e.preventDefault();
  openModal("#modal_3");
});

// Modal lightbox
// - trap focus
function trapModalFocus() {
  var modal = $(".wf-modal-lightbox");
  var modalIsHidden = modal.css("display") === "none";

  if (!modalIsHidden) {
    var focusTrapFirstEl = $("#wf-modal-close-btn");
    var focusTrapParentElements = [".wf-modal-lightbox"];

    var descendantHasFocus = focusTrapParentElements.reduce(function (
      result,
      el
    ) {
      // Check if descendants of specified parent elements are focused
      var elIsFocused = document.activeElement.closest(el) !== null;
      result = result || elIsFocused;
      return result;
    },
    false);

    if (!descendantHasFocus) {
      focusTrapFirstEl.focus();
    }
  }

  window.requestAnimationFrame(trapModalFocus);
}
window.requestAnimationFrame(trapModalFocus);
// - close with escape key
$(window).keydown(function (event) {
  var modal = $(".wf-modal-lightbox");
  var modalIsHidden = modal.css("display") === "none";
  var isEscapeKey =
    event.type === "keydown" && event.originalEvent.code === "Escape";

  if (!modalIsHidden && isEscapeKey) {
    $("#wf-modal-close-btn").click();
  }
});

// Centering an element by event tab
function scrollToElement() {
  $("body").on("keyup", function (event) {
    if (event.key === "Tab") {
      event.target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

// prevent scrolling to input
function handleLinkFocus() {
  $("#content-scroll-1").on("click", function () {
    setTimeout(() => {
      $("#star2a").focus();
      $("#star2a").blur();
    }, 0);
  });
}

function onModalCloseFocus() {
  $("#wf-modal-close-btn").on("focus", function () {
    $("body").on("keydown", onLinkRotate);
  });
}

function onLinkRotate(event) {
  if (!event) return;

  if (event.shiftKey && event.key === "Tab") {
    setTimeout(() => {
      $("#dec2m1").focus();
    }, 0);
    $("body").off("keydown", onLinkRotate);
  }
}

function onLinkOpenModal() {
  $(".link__modal").on("click", function (e) {
    onOpenModal_1();
    var id = $(e.target).attr("data-id");
    if (id) {
      $(id).focus();
    }
  });
}

function onHideStickySuccessText() {
  setTimeout(() => {
    window.addEventListener(
      "scroll",
      function () {
        $(".sticky_form_success-text").addClass("d-none");
      },
      { once: true }
    );
  }, 500);
}

function onScrollSuccessContent() {
  setTimeout(() => {
    var scrollDiv = document.querySelector(".banner_form_success").offsetTop;
    window.scrollTo({ top: scrollDiv - 100, behavior: "smooth" });

    onHideStickySuccessText();
  }, 0);
}

function onFocusElement() {
  $("a.scroll").on("click", function (event) {
    var element = $(`${event.target.hash}`);
    if (element) {
      $(element).attr("tabindex", "0");
      element.focus();

      setTimeout(() => {
        $(element).removeAttr("tabindex");
      }, 100);
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const footnoteID = this.getAttribute("href");
    window.history.pushState(null, null, footnoteID);
    if (footnoteID !== "#") {
      const footnoteElement = document.querySelector(footnoteID);
      if (footnoteElement) {
        // Make it focusable
        setTimeout(() => {
          footnoteElement.setAttribute("tabindex", "-1");

          // Attempt to set focus
          footnoteElement.focus();
        }, 120);

        // setTimeout(() => {
        //   footnoteElement.removeAttribute('tabindex')
        // }, 1000)
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const isFirefoxChecked =
    navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  if (isFirefoxChecked) {
    const mobilenav =
      $(".sticky-content .container").css("flex-direction") === "column";

    if (mobilenav && getDeviceType() === "desktop") {
      $(".sticky-content").hide();
    }
  } else {
    const screenWidth = screen.width;
    const windowWidth = window.innerWidth;

    if (windowWidth != screenWidth) {
      //zooming
      const percentDifference = Math.ceil((screenWidth / windowWidth) * 100);

      if (percentDifference > 200 && screenWidth < 350) {
        $(".sticky-content").hide();
      } else {
        $(".sticky-content").removeAttr("style");
      }
    }
  }
});

window.visualViewport &&
  window.visualViewport.addEventListener("resize", function (event) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

    if (isFirefox) {
      const mobilenav =
        $(".sticky-content .container").css("flex-direction") === "column";

      if (mobilenav && getDeviceType() === "desktop") {
        $(".sticky-content").hide();
      } else {
        $(".sticky-content").removeAttr("style");
      }
    } else {
      var screenWidth = screen.width;
      var windowWidth = window.innerWidth;

      if (windowWidth != screenWidth) {
        //zooming
        var percentDifference = Math.ceil((screenWidth / windowWidth) * 100);

        if (percentDifference > 200) {
          $(".sticky-content").hide();
        } else {
          $(".sticky-content").removeAttr("style");
        }
      }
    }
  });

function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "mobile";
  }

  if (/android/i.test(userAgent)) {
    if (/mobile/i.test(userAgent)) {
      return "mobile";
    } else {
      return "tablet";
    }
  }

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    if (userAgent.includes("iPad")) {
      return "tablet";
    } else {
      return "mobile";
    }
  }

  return "desktop";
}

// Device recognition form field
(function () {
  var deviceType;

  if (jQuery.browser.mobile === true) {
    deviceType = "mobile";
  } else if (jQuery.browser.tablet === true) {
    deviceType = "tablet";
  } else {
    deviceType = "desktop";
  }

  $('input[name="devicetype"]').val(deviceType);
})();

function onClickStickyLink() {
  $(".btn_sticky_link").on("click", function (event) {
    event.preventDefault();
    var scrollTop = $(".section_banner").offset().top;
    $("html, body").animate({ scrollTop }, 500);
    setTimeout(() => {
      $("#banner_link").focus();
    }, 500);
  });
}

const links = document.querySelectorAll(".wf-modal-link");
links.forEach((el) =>
  el.addEventListener("click", (anchor) => {
    const lightboxCloseBtn = document.querySelector("#wf-modal-close-btn");
    let modal = document.querySelector(".wf-modal-lightbox");
    let mainContent = document.querySelector(".wrapper");
    const lighboxBg = document.querySelector(".wf-modal-lightbox-bg");

    // Get all direct children of mainContent
    let children = Array.from(mainContent.children);

    // Filter out the modal
    let otherChildren = children.filter(
      (child) => child !== modal && child !== lighboxBg
    );

    // Set aria-hidden and inert attributes, and change the tabindex
    otherChildren.forEach((child) => {
      child.setAttribute("aria-hidden", "true");
      child.setAttribute("inert", "");
      let focusableElements = child.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
    });

    lightboxCloseBtn.addEventListener("click", (e) => {
      setTimeout(() => {
        anchor.target.focus();
      }, 500);

      let mainContent = document.querySelector(".wrapper");
      let modal = document.querySelector(".wf-modal-lightbox");
      // Get all direct children of mainContent
      let children = Array.from(mainContent.children);

      // Filter out the modal
      let otherChildren = children.filter((child) => child !== modal);

      // Remove aria-hidden and inert attributes, and reset the tabindex
      otherChildren.forEach((child) => {
        child.removeAttribute("aria-hidden");
        child.removeAttribute("inert");
        let focusableElements = child.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusableElements.forEach((element) => {
          element.removeAttribute("tabindex");
        });
      });
    });
  })
);

document.addEventListener("keydown", function (event) {
  var focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var modal = document.querySelector(".wf-modal-lightbox-content");

  // if (!modal.contains(document.activeElement)) {
  //   return;
  // }

  var firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
  var focusableContent = modal.querySelectorAll(focusableElements);
  var lastFocusableElement = focusableContent[focusableContent.length - 1];

  var isTabPressed = event.key === "Tab" || event.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (event.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      event.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      event.preventDefault();
    }
  }
});

document.querySelectorAll(".wf-modal-link").forEach((link) => {
  link.addEventListener("click", () => {
    // Define the onClose function inside the click listener
    // to capture the current link in its closure
    const onClose = () => {
      setTimeout(() => {
        link.focus();
      }, 500);

      // Clean up: remove the event listener to avoid memory leaks
      document
        .querySelector(".wf-modal-lightbox-close-btn")
        .removeEventListener("click", onClose);
    };

    // Add the event listener to the close button
    document
      .querySelector(".wf-modal-lightbox-close-btn")
      .addEventListener("click", onClose);
  });
});

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

// Form validation
var isProcessingMessage = "Processing... Please wait.";
var jqFormValidation = (function () {
  var form1 = "#branchForm";
  var isProcessing = false;
  // var isProcessingMessage = 'Processing... Please wait.';
  var emailaddressErrorMessages = {
    required: "Email address is required",
    email: "Please enter a valid email",
    regex: "Please enter a valid email" // Changes from version 3
  };

  $('input[type="text"]').focus(function (event) {
    event.preventDefault();
  });

  //   document.querySelector('.section_step').style.setProperty('letter-spacing', '-1px', 'important');

  /* START: Changes from version 3 */
  $.validator.addMethod("regex", function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  });
  /* END */

  //branchForm
  $(form1).validate({
    ignore: [],
    rules: {
      emailaddress: {
        required: true,
        email: true,
        regex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ // Changes from version 3
      }
    },
    errorClass: "error",
    validClass: "valid",
    errorElement: "span",
    success: "valid",
    messages: {
      emailaddress: emailaddressErrorMessages
    },
    errorPlacement: function (error, element) {
      error.attr("aria-live", "polite");
      error.attr("role", "status");
      error.attr("id", element.attr("id") + "-error");
      error.attr("tabindex", "-1");
      element.attr("aria-invalid", "true");
      element.attr("aria-describedby", element.attr("id") + "-error");

      error.insertAfter(element);
    }
  });

  $(form1)
    .find("input")
    .on("focusin", function (e) {
      var errorElement = $(this).siblings("span.error");
      if (errorElement.length > 0) {
        var errorMessage = $(errorElement).text();
        setTimeout(function () {
          $(errorElement).text("");
          $(errorElement).attr("aria-live", "off");
          $(errorElement).text(errorMessage);
          $(errorElement).attr("aria-live", "polite");
        }, 500);
      }
    });

  $(form1)
    .find("input")
    .on("focusout", function (e) {
      var errorElement = $(this).siblings("span.error");
      if (errorElement.length > 0) {
        $(errorElement).attr("aria-live", "off");
      }
    });

  function showLoader(form, msg, errcode) {
    if (msg) {
      var inputError = $(form).find(".loader").siblings("input");

      if (inputError.length > 0) {
        $(inputError)[0].focus();
      }

      $(form).find(".loader").html(msg);

      if ($(form).find(".loader").attr("aria-live") === undefined) {
        $(form).find(".loader").attr("aria-live", "polite");
      }
    } else {
      if (isProcessing) {
        $(form).find(".loader").html(isProcessingMessage);
      } else {
        $(form).find(".loader").html("");
      }
    }
    if (errcode) {
      $("#err_code").val(errcode);
    }
  }

  return {
    showLoader: showLoader
  };
})();

// Form submit
(function (branchFormId, onlineFormId, onlineFormRedirectId) {
  function disableButton(button) {
    button.disabled = true;
    button.style.opacity = 0.4;
    button.style.cursor = "not-allowed";
  }
});

// carousel checkingoffer
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

// -----working except the focus goes--------------------------------------------------------------------------------

function activateTab(tabElement) {
  // Deactivate all tabs and their content
  document.querySelectorAll(".tablinks").forEach((tab) => {
    tab.classList.remove("active");
    tab.setAttribute("aria-expanded", "false");
  });

  document.querySelectorAll(".tabcontent").forEach((content) => {
    content.classList.remove("active");
  });

  // Activate the clicked tab and its content
  tabElement.classList.add("active");
  tabElement.setAttribute("aria-expanded", "true");

  const contentId = tabElement.getAttribute("data-target");
  const targetContent = document.getElementById(contentId);
  if (targetContent) {
    targetContent.classList.add("active");
    const focusableElements = targetContent.querySelectorAll(".caption");
    setTimeout(() => {
      focusableElements[0].focus();
    });
    // Enable focus trapping within the active tab content
    trapFocusWithinContent(targetContent, tabElement);
  }
}

function trapFocusWithinContent(tabContent, currentTab) {
  const focusableElements = tabContent.querySelectorAll(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  tabContent.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        // Shift + Tab: Move focus back to the current tab
        e.preventDefault();
        currentTab.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        // Tab: Move focus to the next tab or element after tabs
        e.preventDefault();

        const nextTab = currentTab.nextElementSibling;
        if (nextTab && nextTab.classList.contains("tablinks")) {
          nextTab.focus();
        } else {
          const nextFocusable = findNextFocusableOutsideTab(tabContent);
          if (nextFocusable) {
            nextFocusable.focus();
          }
        }
      }
    }
  });

  // Automatically focus the first focusable element in the tab content
  // if (firstElement) {
  //   firstElement.focus();
  // }
}

function findNextFocusableOutsideTab(element) {
  //debugger;
  // Find the next focusable element after the .tab-cover container
  const allFocusableElements = document.querySelectorAll(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1']), div.accordions"
  );
  // const container = element.closest(".tab-cover");
  //let containerIndex = Array.from(allFocusableElements).indexOf(container);

  //if(containerIndex === -1) {
  // debugger;
  const nextTabEle = document.querySelector(".accordion_button");
  containerIndex = Array.from(allFocusableElements).indexOf(nextTabEle);
  //}

  return allFocusableElements[containerIndex];
}

function handleTabNavigation(e, tabElement, tabIndex, tabList) {
  if (e.key === "Enter") {
    // Enter: Activate the tab
    e.preventDefault();
    activateTab(tabElement);
  }

  // debugger;
  if (e.key === "Tab" && !e.shiftKey) {
    const isLastTab = tabIndex === tabList.length - 1;

    if (isLastTab && !tabElement.classList.contains("active")) {
      // When the last tab is not active, move to the next focusable element
      const nextFocusable = findNextFocusableOutsideTab(tabElement);
      if (nextFocusable) {
        e.preventDefault();
        nextFocusable.focus();
      }
    }
  }
}

document.querySelectorAll(".tablinks").forEach((tab, index, tabList) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (e) =>
    handleTabNavigation(e, tab, index, tabList)
  );
});

// Extra JS
// Function to open a modal
// function openModal(modalId) {
//   const modal = document.getElementById(modalId);
//   const body = document.body;

//   if (!modal) {
//       console.error(`Modal with ID ${modalId} not found.`);
//       return;
//   }

//   // Show the modal and set attributes
//   modal.setAttribute("aria-hidden", "false");
//   modal.style.display = "block";
//   body.style.overflow = "hidden"; // Prevent body scrolling

//   // Trap focus within the modal
//   trapFocus(modal);

//   // Focus the first focusable element in the modal
//   const firstFocusableElement = modal.querySelector(
//       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//   );
//   if (firstFocusableElement) firstFocusableElement.focus();
// }

// // Function to close a modal
// function closeModal(modalId) {
//   const modal = document.getElementById(modalId);
//   const body = document.body;

//   if (!modal) {
//       console.error(`Modal with ID ${modalId} not found.`);
//       return;
//   }

//   // Hide the modal and reset attributes
//   modal.setAttribute("aria-hidden", "true");
//   modal.style.display = "none";
//   body.style.overflow = ""; // Restore body scrolling

//   // Return focus to the triggering element
//   const triggerButton = document.querySelector(`[data-modal-target="${modalId}"]`);
//   if (triggerButton) triggerButton.focus();
// }

// // Function to trap focus within a modal
// function trapFocus(modal) {
//   const focusableElements = modal.querySelectorAll(
//       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//   );
//   const firstElement = focusableElements[0];
//   const lastElement = focusableElements[focusableElements.length - 1];

//   modal.addEventListener("keydown", (event) => {
//       if (event.key === "Tab") {
//           if (event.shiftKey) {
//               // Shift + Tab
//               if (document.activeElement === firstElement) {
//                   event.preventDefault();
//                   lastElement.focus();
//               }
//           } else {
//               // Tab
//               if (document.activeElement === lastElement) {
//                   event.preventDefault();
//                   firstElement.focus();
//               }
//           }
//       }
//   });
// }

// // Event listeners for modal open triggers
// document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
//   trigger.addEventListener("click", (event) => {
//       event.preventDefault();
//       const modalId = trigger.getAttribute("data-modal-target");
//       openModal(modalId);
//   });
// });

// // Event listeners for modal close buttons
// document.querySelectorAll(".wf-modal-lightbox-close-btn").forEach((button) => {
//   button.addEventListener("click", () => {
//       const modalId = button.getAttribute("data-modal-id");
//       closeModal(modalId);
//   });
// });

// // Close modal on background click
// document.querySelectorAll(".wf-modal-lightbox-bg").forEach((bg) => {
//   bg.addEventListener("click", (event) => {
//       const modal = bg.closest(".wf-modal");
//       closeModal(modal.id);
//   });
// });

// // Close modals on Escape key press
// window.addEventListener("keydown", (event) => {
//   if (event.key === "Escape") {
//       document.querySelectorAll(".wf-modal").forEach((modal) => {
//           if (modal.getAttribute("aria-hidden") === "false") {
//               closeModal(modal.id);
//           }
//       });
//   }
// });
