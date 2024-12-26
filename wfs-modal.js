const CLOSE_BTN_ID = "wf-modal-lightbox-close-btn";
const FOCUS_ELEMENT_NAMES =
  "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])";
const BACKGROUD_CLASS = "wf-modal-lightbox-bg";
const MODAL_CLASS = "wf-modal-lightbox";
const MODAL_ACTIVE_CLASS = "active";
const BODY_OVERFLOW = "of-hidden";
const ESCAPE = "Escape";
const TAB = "Tab";
const CLICK = "click";
const KEYDOWN = "keydown";
const BODY = "body";
const DIV = "div";

class WfsModal {
  modalTriggers;
  modalTriggerAttributeName;

  constructor(attributesName) {
    this.modalTriggerAttributeName = attributesName;
    this.modalTriggers = document.querySelectorAll(`[${attributesName}]`);
  }

  renderModal(options = {}) {
    const body = document.querySelector(BODY);

    const getBackgroud = () => {
      const bg = document.createElement(DIV);
      bg.classList.add(BACKGROUD_CLASS);
      return bg;
    };

    const setToggleAndFocus = (modal, b, dom) => {
      modal.classList.toggle(MODAL_ACTIVE_CLASS);
      b.classList.toggle(BODY_OVERFLOW);
      dom.focus();
    };

    for (let index = 0; index < this.modalTriggers.length; index++) {
      const trigger = this.modalTriggers[index];
      const modalId = trigger.getAttribute(this.modalTriggerAttributeName);
      const modal = document.getElementById(modalId);
      if (options && options.backgroud) {
        const contentNode = modal.querySelector(MODAL_CLASS);
        const bgNode = getBackgroud();
        modal.insertBefore(bgNode, contentNode);
      } else {
        const bgNode = modal.querySelector(BACKGROUD_CLASS);
        if (bgNode) {
          modal.removeChild(bgNode);
        }
      }
      const modalCloseButton = modal.querySelector(`.${CLOSE_BTN_ID}`);

      trigger.addEventListener(CLICK, (e) => {
        setToggleAndFocus(modal, body, modalCloseButton);
      });

      modalCloseButton.addEventListener(CLICK, (e) => {
        setToggleAndFocus(modal, body, trigger);
      });

      modal.addEventListener(KEYDOWN, (e) => {
        const { first, last, all } = this.getFocusableElements(modal);
        if (e.key === ESCAPE) {
          setToggleAndFocus(modal, body, trigger);
        }
        if (e.key === TAB) {
          if (all.length === 1) {
            e.preventDefault();
          }
          if (e.target === last) {
            setTimeout(() => {
              first.focus();
            });
          }
        }
      });
    }
  }

  getFocusableElements(dom = document) {
    const focusableElements = dom.querySelectorAll(FOCUS_ELEMENT_NAMES);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    return { first, last, all: focusableElements };
  }
}
