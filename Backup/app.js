jQuery(document).ready(function($){
  smoothScrollLink('a.scroll[href^="#"]', 0, 0);
  $('input#emailaddress').val('')
  /* for sticky CTA START */
  $(window).scroll(function(){
      
      
      if($(".stick_cta").length > 0 && $(".stick_cta").offset().top + 55 < $(window).scrollTop()){
          $(".sticky-content").addClass("fixed");
              $("footer").css("padding-bottom", $(".sticky-content").outerHeight());
          
      }
      else{
          $(".sticky-content").removeClass("fixed");
      }
      
  });
  /* for sticky CTA END */

  scrollToElement();
  handleLinkFocus();
  onModalCloseFocus();
  onLinkOpenModal();
  onFocusElement();
  onClickStickyLink();
});

// Re-enable online buttons when navigating to cached page
window.addEventListener('pageshow', function(e) {
  if (e.persisted) {
    var onlineButton = document.querySelector('form#onlineForm button');
    onlineButton.removeAttribute('style');
    onlineButton.removeAttribute('disabled');
  
    var footerOnlineButton = document.querySelector('footer .open-online');
    footerOnlineButton.removeAttribute('style');
    footerOnlineButton.removeAttribute('disabled');

    // const lpInput = document.querySelector('input[name="msc"][type="hidden"]');

    // if (lpInput.value === 'LPSTF') {
    //   lpInput.value = 'LP';
    // }
  }
});

// Duplicate the single email field to the email confirmation field
$('#branchForm input#emailaddress').change(function(event) {
  $('#branchForm input#confirmemailaddress').val(event.target.value);
  $('#onlineFormSticky1 input#sticky_emailaddress').val(event.target.value);
});

$('#onlineFormSticky1 input#sticky_emailaddress').on('input', function (event) {
  $('#branchForm input#confirmemailaddress').val(event.target.value);
  $('#branchForm input#emailaddress').val(event.target.value).blur();
});

window.addEventListener('resize', () => {
  if(document.querySelector('.footer-sticky__success').style.display === 'flex') {
    document.querySelector('.footer-sticky').style.backgroundColor = '#fff';
  }
});
  
// handle back to top button
$('.to-top_btn').on('click', function () {
  $('html, body').animate(
    {
      scrollTop: 0
    },
    500
  );

  $('.main_logo-link').trigger('focus');
});


// $('.open-online').on('click', function(e) {

  
//   const lpInput = document.querySelector('input[name="msc"][type="hidden"]');
//   if (lpInput) {
//     lpInput.value = 'LPSTF';
//   }
  
//   // $('#banner_link').trigger("click");
// })

// Modal link
let curModalLink = null;
$('.wf-modal-link').on('click', onOpenModal);

function onOpenModal(event) {
event.preventDefault();
curModalLink = event.target;

var modalBackground = $('.wf-modal-lightbox-bg');
var modal = $('.wf-modal-lightbox');
var body = $('body');

var isHidden =
  modalBackground.css('display') === 'none' &&
  modal.css('display') === 'none';

if (isHidden) {
  modalBackground.fadeIn();
  modal.fadeIn();
  body.css('overflow', 'hidden'); // prevent scrolling while modal is shown
}
}

// Modal scroll link
$('.wf-modal-lightbox-body a.scroll').click(function (el) {
var modalBackground = $('.wf-modal-lightbox-bg');
var modal = $('.wf-modal-lightbox');
var body = $('body');

var isHidden = modalBackground.css('display') === 'none' && modal.css('display') === 'none';

if (!isHidden) {
    modalBackground.fadeOut();
    modal.fadeOut();
    body.css('overflow', 'initial');    // restore scrolling when modal is hidden
    setTimeout(function() {
      const elementID = $(el.target).attr('href');
      const hideLink = document.createElement('a');
      $(hideLink).attr('href', '#').addClass('d-none');
      $(elementID).prepend(hideLink);
      $(hideLink).focus().blur().remove();
    }, 500);
}
});

// Modal close button
$('#wf-modal-close-btn').click(function () {
var modalBackground = $('.wf-modal-lightbox-bg');
var modal = $('.wf-modal-lightbox');
var body = $('body');

var isHidden = modalBackground.css('display') === 'none' && modal.css('display') === 'none';

if (!isHidden) {
    modalBackground.fadeOut();
    modal.fadeOut();
    body.css('overflow', 'initial');    // restore scrolling when modal is hidden
    if (curModalLink) {
      setTimeout(function() {
        $(curModalLink).focus().blur();
      }, 500);
    }
}
});

// Modal lightbox
// - trap focus
function trapModalFocus () {
var modal = $('.wf-modal-lightbox');
var modalIsHidden = modal.css('display') === 'none';

if (!modalIsHidden) {
    var focusTrapFirstEl = $('#wf-modal-close-btn');
    var focusTrapParentElements = [
        '.wf-modal-lightbox'
    ];

    var descendantHasFocus = focusTrapParentElements.reduce(function (result, el) {
        // Check if descendants of specified parent elements are focused
        var elIsFocused = document.activeElement.closest(el) !== null;
        result = result || elIsFocused;
        return result;
    }, false);

    if (!descendantHasFocus) {
        focusTrapFirstEl.focus();
    }
}

window.requestAnimationFrame(trapModalFocus);
}
window.requestAnimationFrame(trapModalFocus);
// - close with escape key
$(window).keydown(function(event) {
var modal = $('.wf-modal-lightbox');
var modalIsHidden = modal.css('display') === 'none';
var isEscapeKey = event.type === 'keydown' && event.originalEvent.code === 'Escape';

if (!modalIsHidden && isEscapeKey) {
    $('#wf-modal-close-btn').click();
}
});

// Centering an element by event tab
function scrollToElement() {
$('body').on('keyup', function (event) {
  if (event.key === 'Tab') {
    event.target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
});
}

// prevent scrolling to input
function handleLinkFocus() {
$('#content-scroll-1').on('click', function () {
  setTimeout(() => {
    $('#star2a').focus();
    $('#star2a').blur();
  }, 0);
});
}

function onModalCloseFocus() {
$('#wf-modal-close-btn').on('focus', function() {
  $('body').on('keydown', onLinkRotate);
});
}

function onLinkRotate(event) {
if (!event) return;

if (event.shiftKey && event.key === 'Tab') {
  setTimeout(() => {
    $('#dec2m1').focus();
  }, 0);
  $('body').off('keydown', onLinkRotate);
}
}

function onLinkOpenModal() {
$('.link__modal').on('click', function(e) {
  onOpenModal();
  var id = $(e.target).attr('data-id');
  if(id) {
    $(id).focus();
  }
})
}

function onHideStickySuccessText() {
setTimeout(() => {
  window.addEventListener('scroll', function () {
    $('.sticky_form_success-text').addClass('d-none');
  }, { once: true })
}, 650);
}

function onScrollSuccessContent() {
setTimeout(() => {
  var scrollDiv = document.querySelector('.banner_form_success').offsetTop;
  window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth' });

  onHideStickySuccessText();
}, 0);
}

function onFocusElement() {
  document.querySelectorAll('a.scroll').forEach(elements => {
    elements.addEventListener('click', (e) => {
      let elem = document.querySelector(e.target.hash)
      elem.setAttribute('tabindex', '0')
      elem.focus()
      setTimeout(() => {
        elem.removeAttribute('tabindex')
      }, 100);
    });
  });
}

document.querySelector('.offer-link').addEventListener('click', () => {
  const link = document.querySelector('#star3')
  setTimeout(() => {
    link.scrollIntoView({block: 'start', behavior: 'smooth'})

  }, 250)

  setTimeout(() => {
    window.scrollBy(0, -50);
  }, 1000)

})


document.querySelectorAll('.wf-modal-link').forEach((link) => {
  link.addEventListener('click', () => {
      // Define the onClose function inside the click listener
      // to capture the current link in its closure
      const onClose = () => {
          setTimeout(() => {
              link.focus();
          }, 500);

          // Clean up: remove the event listener to avoid memory leaks
          document.querySelector('.wf-modal-lightbox-close-btn').removeEventListener('click', onClose);
      };

      // Add the event listener to the close button
      document.querySelector('.wf-modal-lightbox-close-btn').addEventListener('click', onClose);
  });
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const footnoteID = this.getAttribute('href');
    window.history.pushState(null, null, footnoteID);

    if (footnoteID !== '#') {
      const footnoteElement = document.querySelector(footnoteID);


      if (footnoteElement) {
        footnoteElement.scrollIntoView({block: 'start', behavior: 'smooth'})

        // Make it focusable
        setTimeout(() => {
          footnoteElement.setAttribute('tabindex', '-1');
  
          // Attempt to set focus
          footnoteElement.focus();
  
        }, 120)
  
        // setTimeout(() => {
        //   footnoteElement.removeAttribute('tabindex')
        // }, 1000)
      }
    }
  });
});

// ADA Fix - Hide sticky CTA at > 200% zoom level
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
    if (userAgent.includes('iPad')) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  }

  return "desktop";
}










window.visualViewport && window.visualViewport.addEventListener("resize", function(event) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (isFirefox) {

    const mobilenav = $(".section__3__body__column").css("marginLeft") === "-15px";


    if (mobilenav && getDeviceType() === 'desktop') {
        $(".sticky-content").hide();
    }

    else {
      $(".sticky-content").removeAttr("style");
    }
  }
else {
  var screenWidth = screen.width;
  var windowWidth = window.innerWidth;

  if (windowWidth != screenWidth) { //zooming
    var percentDifference = Math.ceil(( screenWidth / windowWidth) * 100);

    if (percentDifference > 200) {
      $(".sticky-content").hide();
    }

    else {
      $(".sticky-content").removeAttr("style");
    }
  }
}
});


const deviceType = getDeviceType();

const emailInput = document.querySelector('#emailaddress');
const emailSticky = document.querySelector('#sticky_emailaddress');
const stickyBanner = document.querySelector('.sticky-content');
let preventScroll = function(event) {
  event.preventDefault();
};
if (deviceType !== 'desktop')  {
  emailInput.addEventListener('focus', (e) => {
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
     }, 250)
    document.addEventListener('touchmove', preventScroll, { passive: false });
    // Prevent scrolling on non-touch devices
    document.addEventListener('wheel', preventScroll, { passive: false });
    stickyBanner.classList.add('hidden-sticky')
  })

  emailInput.addEventListener('blur', () => {
    // Restore scrolling on touch devices
    document.removeEventListener('touchmove', preventScroll, { passive: false });
    // Restore scrolling on non-touch devices
    document.removeEventListener('wheel', preventScroll, { passive: false });
    stickyBanner.classList.remove('hidden-sticky');
  });


  emailSticky && emailSticky.addEventListener('focus', (e) => {
    if (e.target) {
      const target = e.target;
      stickyBanner.style.paddingBottom = '3rem'
     setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
     }, 250)
    }
    document.addEventListener('touchmove', preventScroll, { passive: false });
    // Prevent scrolling on non-touch devices
    document.addEventListener('wheel', preventScroll, { passive: false });
 
  })

  emailSticky && emailSticky.addEventListener('blur', () => {
    // Restore scrolling on touch devices
    stickyBanner.style.paddingBottom = '20px'
    document.removeEventListener('touchmove', preventScroll, { passive: false });
    // Restore scrolling on non-touch devices
    document.removeEventListener('wheel', preventScroll, { passive: false });
 
  });
}

function onClickStickyLink() {
$('.btn_sticky_link').on('click', function (event) {
  event.preventDefault();
  var scrollTop = $('.section_banner').offset().top;
  $('html, body').animate({ scrollTop }, 500);
  setTimeout(() => {
    $('#banner_link').focus();
  }, 500);
});
}

// Device recognition form field
(function() {
  var deviceType;
  
  if (jQuery.browser.mobile === true) {
    deviceType = "mobile";
  }
  else if (jQuery.browser.tablet === true) {
    deviceType = "tablet";
  }
  else {
    deviceType = "desktop";
  }
  
  $('input[name="devicetype"]').val(deviceType);
})();
const links = document.querySelectorAll('.wf-modal-link')
links.forEach(el => el.addEventListener('click', (anchor) => {
const lightboxCloseBtn = document.querySelector('#wf-modal-close-btn')
let modal = document.querySelector('.wf-modal-lightbox')
let mainContent = document.querySelector('.wrapper');
const lighboxBg = document.querySelector('.wf-modal-lightbox-bg')

    // Get all direct children of mainContent

    if (mainContent) {
      let children = Array.from(mainContent?.children);
  
        let otherChildren = children.filter(child => child !== modal && child !== lighboxBg);
      
        // Set aria-hidden and inert attributes, and change the tabindex
        otherChildren.forEach((child) => {
          child.setAttribute('aria-hidden', 'true');
          child.setAttribute('inert', '');
          let focusableElements = child.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          focusableElements.forEach((element) => {
            element.setAttribute('tabindex', '-1');
          });
        });
      
        lightboxCloseBtn.addEventListener('click', (e) => {
          setTimeout(() => {
            anchor.target.focus()
          }, 500)
        
      
          let mainContent = document.querySelector('.wrapper');
          let modal = document.querySelector('.wf-modal-lightbox')
          // Get all direct children of mainContent
          let children = Array.from(mainContent.children);
          
          // Filter out the modal
          let otherChildren = children.filter(child => child !== modal);
          
          // Remove aria-hidden and inert attributes, and reset the tabindex
          otherChildren.forEach((child) => {
            child.removeAttribute('aria-hidden');
            child.removeAttribute('inert');
            let focusableElements = child.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusableElements.forEach((element) => {
              element.removeAttribute('tabindex');
            });
          });
        })
      }
      
      // Filter out the modal
     
    }))

document.addEventListener('keydown', function (event) {
var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
var modal = document.querySelector('.wf-modal-lightbox-content'); 

if (!modal.contains(document.activeElement)) {
  return;
}

var firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
var focusableContent = modal.querySelectorAll(focusableElements);
var lastFocusableElement = focusableContent[focusableContent.length - 1];

var isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

if (!isTabPressed) {
  return;
}

if (event.shiftKey) { // if shift key pressed for shift + tab combination
  if (document.activeElement === firstFocusableElement) {
    lastFocusableElement.focus(); // add focus for the last focusable element
    event.preventDefault();
  }
} else { // if tab key is pressed
  if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
    firstFocusableElement.focus(); // add focus for the first focusable element
    event.preventDefault();
  }
}
});

const offerCodeInput = document.querySelector('#emailaddress');
const offerCodeLabel = document.querySelector('.emailaddress_label');

offerCodeInput.addEventListener('input', (e) => {

if (e.target.value.length > 0) {
 
  offerCodeLabel.classList.add('active');
  offerCodeInput.classList.add('active');

} else {
  offerCodeLabel.classList.remove('active');
  offerCodeInput.classList.remove('active');
}
});


// Form parameters
formParams.setParams('#onlineFormSubmit', [{
  sourceNames: ['product_code'],
  targetNames: ['product_code']
}, {
  sourceNames: ['subproduct_code'],
  targetNames: ['subproduct_code']
}, {
  sourceNames: ['msc', 'creative_id'],
  targetNames: ['msc']
}, {
  sourceNames: ['creative_id'],
  targetNames: ['creative_id']
}, {
  sourceNames: ['collateral_code', 'placement_id'],
  targetNames: ['collateral_code']
}, {
  sourceNames: ['placement_id'],
  targetNames: ['placement_id']
}, {
  sourceNames: ['sub_channel'],
  targetNames: ['sub_channel']
}, {
  sourceNames: ['vendor_code'],
  targetNames: ['vendor_code']
}, {
  sourceNames: ['siteID'],
  targetNames: ['siteID']
}, {
  sourceNames: ['cx_nm'],
  targetNames: ['cx_nm']
}, {
  sourceNames: ['m_id'],
  targetNames: ['m_id']
}, {
  sourceNames: ['search_term'],
  targetNames: ['search_term']
}, {
  sourceNames: ['dm', 'lp_cx_nm'],
  targetNames: ['dm']
}, {
  sourceNames: ['lp_cx_nm'],
  targetNames: ['lp_cx_nm']
}, {
  sourceNames: ['intr_pg_nm'],
  targetNames: ['intr_pg_nm']
}, {
  sourceNames: ['pub_sid'],
  targetNames: ['pub_sid']
}, {
  sourceNames: ['d_site_id'],
  targetNames: ['d_site_id']
}, {
  sourceNames: ['utm_campaign'],
  targetNames: ['utm_campaign']
}, {
  sourceNames: ['utm_source'],
  targetNames: ['utm_source']
}, {
  sourceNames: ['utm_content'],
  targetNames: ['utm_content']
}, {
  sourceNames: ['gclid'],
  targetNames: ['gclid']
}]);

formParams.setParams('#onlineForm', [{
  sourceNames: ['product_code'],
  targetNames: ['productCode']
}, {
  sourceNames: ['subproduct_code'],
  targetNames: ['subproductCode']
}, {
  sourceNames: ['msc', 'creative_id'],
  targetNames: ['msc']
}, {
  sourceNames: ['creative_id'],
  targetNames: ['creativeId']
}, {
  sourceNames: ['collateral_code', 'placement_id'],
  targetNames: ['collateralCode']
}, {
  sourceNames: ['placement_id'],
  targetNames: ['placementId']
}, {
  sourceNames: ['sub_channel'],
  targetNames: ['subChannel']
}, {
  sourceNames: ['vendor_code'],
  targetNames: ['vendorCode']
}, {
  sourceNames: ['siteID'],
  targetNames: ['siteID']
}, {
  sourceNames: ['cx_nm'],
  targetNames: ['cxNm']
}, {
  sourceNames: ['m_id'],
  targetNames: ['mId']
}, {
  sourceNames: ['search_term'],
  targetNames: ['searchTerm']
}, {
  sourceNames: ['dm', 'lp_cx_nm'],
  targetNames: ['dm']
}, {
  sourceNames: ['lp_cx_nm'],
  targetNames: ['lpCxNm']
}, {
  sourceNames: ['intr_pg_nm'],
  targetNames: ['intrPgNm']
}, {
  sourceNames: ['pub_sid'],
  targetNames: ['pubSid']
}, {
  sourceNames: ['d_site_id'],
  targetNames: ['dSiteId']
}, {
  sourceNames: ['utm_campaign'],
  targetNames: ['utmCampaign']
}, {
  sourceNames: ['utm_source'],
  targetNames: ['utmSource']
}, {
  sourceNames: ['utm_content'],
  targetNames: ['utmContent']
}, {
  sourceNames: ['gclid'],
  targetNames: ['gclid']
}]);

formParams.setParams('#branchForm', [{
  sourceNames: ['product_code'],
  targetNames: ['productCode']
}, {
  sourceNames: ['subproduct_code'],
  targetNames: ['subproductCode']
}, {
  sourceNames: ['msc'],
  targetNames: ['msc']
}, {
  sourceNames: ['creative_id'],
  targetNames: ['creativeId']
}, {
  sourceNames: ['collateral_code'],
  targetNames: ['collateralCode']
}, {
  sourceNames: ['placement_id'],
  targetNames: ['placementId']
}, {
  sourceNames: ['sub_channel'],
  targetNames: ['subChannel']
}, {
  sourceNames: ['vendor_code'],
  targetNames: ['vendorCode']
}, {
  sourceNames: ['siteID'],
  targetNames: ['siteID']
}, {
  sourceNames: ['cx_nm'],
  targetNames: ['cxNm']
}, {
  sourceNames: ['m_id'],
  targetNames: ['mId']
}, {
  sourceNames: ['search_term'],
  targetNames: ['searchTerm']
}, {
  sourceNames: ['dm'],
  targetNames: ['dm']
}, {
  sourceNames: ['lp_cx_nm'],
  targetNames: ['lpCxNm']
}, {
  sourceNames: ['intr_pg_nm'],
  targetNames: ['intrPgNm']
}, {
  sourceNames: ['pub_sid'],
  targetNames: ['pubSid']
}, {
  sourceNames: ['d_site_id'],
  targetNames: ['dSiteId']
}, {
  sourceNames: ['prodCode'],
  targetNames: ['prodCode']
}, {
  sourceNames: ['prodSet'],
  targetNames: ['prodSet']
}, {
  sourceNames: ['utm_campaign'],
  targetNames: ['utmCampaign']
}, {
  sourceNames: ['utm_source'],
  targetNames: ['utmSource']
}, {
  sourceNames: ['utm_content'],
  targetNames: ['utmContent']
}, {
  sourceNames: ['gclid'],
  targetNames: ['gclid']
}]);


// Form validation
var isProcessingMessage = 'Processing... Please wait.';
var jqFormValidation = (function() {
var form1 = "#branchForm";
var isProcessing = false;
// var isProcessingMessage = 'Processing... Please wait.';
var emailaddressErrorMessages = {
  required: "Email address is required",
  email:"Please enter a valid email",
  regex: 'Please enter a valid email' // Changes from version 3
}

$('input[type="text"]').focus(function(event) {
  event.preventDefault();
});

/* START: Changes from version 3 */
$.validator.addMethod('regex', function (value, element, regexp) {
  var re = new RegExp(regexp);
  return this.optional(element) || re.test(value);
})
/* END */

//branchForm
$(form1).validate({
  ignore: [],
  rules: {
    emailaddress: {
      required: true,
      email:true,
      regex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ // Changes from version 3
    }
  },
  errorClass: 'error',
  validClass: 'valid',
  errorElement: 'span',
  success: "valid",
  messages: {
    emailaddress: emailaddressErrorMessages
  },
  errorPlacement: function (error, element) {
    error.attr('aria-live', 'polite');
    error.attr('role', 'status');
    error.attr('id', element.attr('id') + '-error');
    error.attr('tabindex', '-1');
    element.attr('aria-invalid', 'true');
    element.attr('aria-describedby', element.attr('id') + '-error');
    
    error.insertAfter(element);
  }
});

$(form1).find("input").on("focusin", function(e) {
  var errorElement = $(this).siblings("span.error");
  if (errorElement.length > 0) {
    var errorMessage = $(errorElement).text();
    setTimeout(function() {
      $(errorElement).text("");
      $(errorElement).attr("aria-live", "off");
      $(errorElement).text(errorMessage);
      $(errorElement).attr("aria-live", "polite");
    }, 500);
  }
});

$(form1).find("input").on("focusout", function(e) {
  var errorElement = $(this).siblings("span.error");
  if (errorElement.length > 0) {
    $(errorElement).attr("aria-live", "off");
  }
});

function showLoader(form, msg, errcode) {
  if (msg) {
    var inputError = $(form).find('.loader').siblings("input");

    if (inputError.length > 0) {
      $(inputError)[0].focus();
    }

    $(form).find('.loader').html(msg);

    if ($(form).find('.loader').attr("aria-live") === undefined) {
      $(form).find('.loader').attr("aria-live", "polite");
    }
  }
  else {
    if (isProcessing) {
      $(form).find('.loader').html(isProcessingMessage);
    }
    else {
      $(form).find('.loader').html('');
    }
  }	
  if (errcode) {
    $('#err_code').val(errcode);
  }
}

return {
  showLoader: showLoader
};
})();

// Form submit
(function(branchFormId, onlineFormId, onlineFormRedirectId) {
  function disableButton(button) {
    button.setAttribute('disabled', '');
    button.style.opacity = 0.4;
    button.style.cursor = 'not-allowed';
  }

  function handleBranchFormResponse(data) {
    function hideForms() {
      // var forms = document.querySelectorAll('.banner_form .banner_form_right_col form');
      // var disclosure = document.querySelectorAll('.banner_form .banner_form_right_col .banner_form_disclosure');
      // var successDiv = document.querySelector('.banner_form_success');

      // var stickyContent = document.querySelector('.sticky-content .container:not(.sticky_form_success)');
      // var stickySuccessDiv = document.querySelector('.sticky_form_success');
      const unsuccess = document.querySelector('.joinus__column__unsuccess')
      const success = document.querySelector('.joinus__column__success')
      document.querySelector('.sticky_form_success_code').innerHTML = offerCode;
      document.querySelector('.sticky_form_success_email').innerHTML = email;

      // Hide
      // forms.forEach(function (formEl) {
      //   formEl.style = 'display: none';
      // });
      // stickyContent.style = 'display: none';
      // disclosure[0].style = 'display: none';
      // disclosure[1].style = 'visibility: hidden';
      unsuccess.style.display = 'none';
      success.style.display = 'block';
      success.setAttribute('tabindex', '-1');
      success.focus();

      // Show
      // successDiv.style = 'display: block';
      // stickySuccessDiv.style = 'display: flex';

      // Focus the success text
      // successDiv.setAttribute('tabindex', '-1');
      // successDiv.focus();
      // $('#branchForm input#emailaddress').val('');
      onScrollSuccessContent();
    }

    if (data) {
      var offerCode = data.offercode;
      var email = data.emailaddress;
      document.querySelector('.banner_form_success_code').innerHTML = offerCode;
      document.querySelector('.banner_form_success_email').innerHTML = email;
      document.querySelector('.footer-sticky').classList.add('bg-white');
      document.querySelector('.footer-sticky__unsuccess').style.display = 'none';
      document.querySelector('.footer-sticky__success').style.display = 'flex';
      hideForms();
    }
  }

  function validateOnlineForm(result) {
    if (result.success) {
      document.querySelector(`#${onlineFormRedirectId}`).submit();
    }
  }

  formSubmit.handleFormSubmit(function(result) {
    // Handle branch form response
    if (result.id === branchFormId) {
      if (result.success) {
        if (Object.keys(result.errorData).length > 0) {
          result.entity.offercode = result.errorData.offercode;
          result.entity.emailaddress = result.fieldData.emailaddress;
        }
        handleBranchFormResponse(result.entity); 
      }
      else {
        jqFormValidation.showLoader(`#${branchFormId}`, 'Unexpected error. Please try again.');
        setTimeout(() => {
          $('#emailaddress').focus();
        }, 100)
      }
    }

    // Handle online form response
    else if (result.id === onlineFormId) {
      validateOnlineForm(result);
    }
  }, function(event) {
    var shouldSubmit = false;

    // Handle branch form button click
    if (event.target.id === branchFormId) {
      shouldSubmit = $(`#${branchFormId}`).valid();

      if (shouldSubmit) {
        disableButton(document.querySelector(`#${branchFormId} button[type="submit"]`));
      }
      else {
        var inputError = $(`#${branchFormId}`).find("input.error");

        if (inputError.length > 0) {
          $(`#${branchFormId} button[type="submit"]`).focus();
          $(inputError)[0].focus();
        }
      }
    }

    // Handle online form button click
    else if (event.target.id === onlineFormId) {
      shouldSubmit = true;
      disableButton(document.querySelector(`#${onlineFormId} button[type="submit"]`));
      disableButton(document.querySelector('footer .open-online'));
    }

    return shouldSubmit;
  });
})('branchForm', 'onlineForm', 'onlineFormSubmit');
