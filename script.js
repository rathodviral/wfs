var isMobileForTabActivate = false;

document.querySelectorAll(".tablinks").forEach((tab, index, tabList) => {
  if (!isMobileForTabActivate) {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (e) =>
      handleTabNavigation(e, tab, index, tabList)
    );
  }
});

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
  const focusableCaption = tabContent.querySelectorAll(".caption");
  const focusableElements = tabContent.querySelectorAll(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  tabContent.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (
        e.shiftKey &&
        (document.activeElement === firstElement ||
          document.activeElement === focusableCaption[0])
      ) {
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
  //   if (firstElement) {
  //     firstElement.focus();
  //   }
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

const links = document.querySelectorAll(".wf-modal-link");

let openModalId = "";
let clickLinkId = "";

$("#wf-modal-link_1").on("click", function (e) {
  e.preventDefault();
  openModalId = "#modal_1";
  clickLinkId = "#wf-modal-link_1";
  openModal();
});

$("#wf-modal-link_2").on("click", function (e) {
  e.preventDefault();
  openModalId = "#modal_2";
  clickLinkId = "#wf-modal-link_2";
  openModal();
});

$("#wf-modal-link_3").on("click", function (e) {
  e.preventDefault();
  openModalId = "#modal_3";
  clickLinkId = "#wf-modal-link_3";
  openModal();
});

$("#wf-modal-link_4").on("click", function (e) {
  e.preventDefault();
  openModalId = "#modal_3";
  clickLinkId = "#wf-modal-link_4";
  openModal();
});

const getModal = () => {
  const modalWrap = $(openModalId);
  const modal = modalWrap.find(".wf-modal-lightbox");
  const modalBg = modalWrap.find(".wf-modal-lightbox-bg");
  const body = $("body");
  return { modal, modalBg, body };
};

const preventScreenReader = (isPrevent = false) => {
  const { body } = getModal();
  let children = Array.from(body.children());

  // Filter out the modal
  let otherChildren = children.filter(
    (child) => !openModalId.includes($(child).attr("id"))
  );

  // Set aria-hidden and inert attributes, and change the tabindex
  otherChildren.forEach((child) => {
    const focusableElements = child.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (isPrevent) {
      child.setAttribute("aria-hidden", "true");
      child.setAttribute("inert", "");
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
    } else {
      child.removeAttribute("aria-hidden");
      child.removeAttribute("inert");
      focusableElements.forEach((element) => {
        element.removeAttribute("tabindex");
      });
    }
  });
};
// Function to open a modal
function openModal() {
  const { modal, modalBg, body } = getModal();
  // Show the modal
  modalBg.fadeIn();
  modal.fadeIn();
  body.css("overflow", "hidden"); // Prevent scrolling
  const focusableElements = modal.find(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
  );
  const firstElement = focusableElements[0];
  firstElement.focus();
  preventScreenReader(true);
}

// Function to close a modal
function closeModal() {
  const { modal, modalBg, body } = getModal();
  // Hide all modals
  modal.fadeOut();
  modalBg.fadeOut();
  body.removeAttr("style"); // Restore scrolling
  preventScreenReader();
  $(clickLinkId).focus();
  openModalId = "";
  clickLinkId = "";
}

// Modal close button
$(".wf-modal-lightbox-close-btn").on("click", function () {
  closeModal();
});

// Close modal on ESC key
$(window).on("keydown", function (event) {
  const { modal } = getModal();
  const isModalShow = modal.css("display") !== "none";
  if (isModalShow) {
    if (event.key === "Escape") {
      closeModal();
    }
    if (event.key === "Tab") {
      const focusableElements = modal.find(
        "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstElement) {
          lastElement.focus(); // add focus for the last focusable element
          event.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstElement.focus(); // add focus for the first focusable element
          event.preventDefault();
        }
      }
    }
  }
  const a = document.querySelectorAll(".learn_more");
  if (document.activeElement === a[a.length - 1] && isMobileForTabActivate) {
    setTimeout(() => {
      document.querySelector(".owl-dot.active").focus();
    }, 10);
    console.log(document.querySelector(".owl-dot.active"));
  }
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

document.addEventListener("DOMContentLoaded", function (e) {
  const isFirefoxChecked =
    navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  if (isFirefoxChecked) {
    // const mobilenav =
    //   $(".sticky-content .container").css("flex-direction") === "column";

    // if (mobilenav && getDeviceType() === "desktop") {
    //   $(".sticky-content").hide();
    // }
    toggleStickyContent();

    // document.body.removeChild(svg);
  } else {
    toggleStickyContent();
  }
});

const toggleStickyContent = () => {
  // var percentDifference = Math.round(window.devicePixelRatio * 100);
  // console.log(percentDifference);

  // if (percentDifference > 200) {
  //   $(".sticky-content").hide();
  // } else {
  //   $(".sticky-content").removeAttr("style");
  // }
  var screenWidth = screen.width;
  var windowWidth = window.innerWidth;
  var width = window.innerWidth || screen.width;

  //zooming
  var percentDifference = Math.ceil((screenWidth / windowWidth) * 100);
  // let zoom = ((window.outerWidth - 10) / window.innerWidth) * 100;
  // var zoom = detectZoom.zoom();
  // var device = detectZoom.device();

  // console.log(zoom, device);

  // if (percentDifference > 200) {
  //   $(".sticky-content").hide();
  // } else {
  //   $(".sticky-content").removeAttr("style");
  // }

  isMobileForTabActivate = width < 768;
};

window.visualViewport &&
  window.visualViewport.addEventListener("resize", function (event) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

    if (isFirefox) {
      // const mobilenav =
      //   $(".sticky-content .container").css("flex-direction") === "column";
      // if (mobilenav && getDeviceType() === "desktop") {
      //   $(".sticky-content").hide();
      // } else {
      //   $(".sticky-content").removeAttr("style");
      toggleStickyContent();
      // }
    } else {
      toggleStickyContent();
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

var carouselEl = $(".owl-carousel-mobile");

carouselEl.owlCarousel({
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
updateArrowColors();
carouselMakeHiddenItems();

function updateArrowColors() {
  let owl = $(".owl-carousel");
  let totalItems = owl.find(".owl-item").length;
  let visibleItems = owl.find(".owl-item.active").length;
  let firstActiveIndex = owl.find(".owl-item.active").first().index();
  let lastActiveIndex = owl.find(".owl-item.active").last().index();
  // Check if the first or last item is visible
  if (firstActiveIndex === 0) {
    $("#owl-prev img").css("filter", "invert(0.5)");
    $("#owl-prev").attr("aria-disabled", "true");
  } else {
    $("#owl-prev img").removeAttr("style");
    $("#owl-prev").removeAttr("aria-disabled");
  }

  if (lastActiveIndex === 3) {
    $("#owl-next img").css("filter", "invert(0.5)");
    $("#owl-next").attr("aria-disabled", "true");
  } else {
    $("#owl-next img").removeAttr("style");
    $("#owl-next").removeAttr("aria-disabled");
  }
}

function carouselMakeHiddenItems() {
  document.querySelectorAll(".owl-item").forEach((el) => {
    if (!el.classList.contains("active")) {
      // el.setAttribute("aria-hidden", "true");
    } else {
      el.removeAttribute("aria-hidden");
    }
  });
}
