class WfsDOM {
  mainDom;
  attributes = {
    id: "id",
    className: "class",
    style: "style",
    tabIndex: "tabindex",
    dataTarget: "data-target"
  };

  constructor(id) {
    this.mainDom = document.getElementById(id);
  }

  createDom(name, options) {
    const dom = document.createElement(name);
    const keys = Object.keys(options);
    if (keys.length) {
      keys.forEach((key) => {
        if (options[key]) {
          dom.setAttribute(this.attributes[key], options[key]);
        }
      });
    }
    return dom;
  }

  appendDom(appendId, dom) {
    if (appendId) {
      let appendDiv;
      if (document.getElementById(appendId)) {
        appendDiv = document.getElementById(appendId);
      } else {
        appendDiv = document.getElementsByClassName(appendId)[0];
      }
      appendDiv.append(dom);
    } else {
      this.mainDom.append(dom);
    }
  }

  createObjectForDom(type, options) {
    const {
      appendId,
      id,
      className,
      value,
      style,
      size,
      tabIndex,
      dataTarget
    } = options;
    return {
      type,
      ...(appendId ? { appendId } : { appendId: null }),
      ...(id ? { id } : {}),
      ...(className ? { className } : {}),
      ...(tabIndex ? { tabIndex } : {}),
      ...(dataTarget ? { dataTarget } : {}),
      ...(style ? { style } : {}),
      ...(size ? { size } : {}),
      ...(value ? { value } : { value: "" })
    };
  }

  createObject(type, className, options = {}, children = []) {
    const { id, style, size, tabIndex, dataTarget } = options;
    return {
      type,
      children: [this.renderDom(children)],
      ...(id ? { id } : {}),
      ...(className ? { className } : {}),
      ...(tabIndex ? { tabIndex } : {}),
      ...(dataTarget ? { dataTarget } : {}),
      ...(style ? { style } : {}),
      ...(size ? { size } : {})
    };
  }

  createDiv({ appendId, id, className, value }) {
    const div = this.createDom("div", { id, className });
    div.append(value);
    this.appendDom(appendId, div);
  }

  createHeadding({ appendId, id, className, size, value }) {
    const head = this.createDom(`h${size}`, { id, className });
    head.append(value);
    this.appendDom(appendId, head);
  }

  renderDom(list) {
    list.forEach((item) => {
      const { type } = item;
      switch (type) {
        case "div":
          this.createDiv(item);
          break;
        case "headding":
          this.createHeadding(item);
          break;
        default:
          break;
      }
    });
  }

  renderDomElement(list) {
    const { type } = item;
    switch (type) {
      case "div":
        this.createDiv(item);
        break;
      case "headding":
        this.createHeadding(item);
        break;
      default:
        break;
    }
  }
}

class WfsChildDOM {
  mainDom;
  attributes = {
    id: "id",
    className: "class",
    style: "style",
    tabIndex: "tabindex",
    src: "src",
    alt: "alt",
    dataTarget: "data-target"
  };

  constructor(id) {
    this.mainDom = document.getElementById(id);
  }

  createObject(options = {}) {
    const { id, style, tabIndex, dataTarget, className, src, alt } = options;
    return {
      ...(id ? { id } : {}),
      ...(className ? { className } : {}),
      ...(tabIndex ? { tabIndex } : {}),
      ...(dataTarget ? { dataTarget } : {}),
      ...(src ? { src } : {}),
      ...(alt ? { alt } : {}),
      ...(style ? { style } : {})
    };
  }

  createDom(name, options, children = []) {
    const dom = document.createElement(name);
    const keys = Object.keys(this.createObject(options));
    if (keys.length) {
      keys.forEach((key) => {
        if (options[key] && this.attributes[key]) {
          dom.setAttribute(this.attributes[key], options[key]);
        }
      });
    }
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      if (typeof child === "string") {
        dom.append(child);
      } else {
        dom.appendChild(child);
      }
    }
    return dom;
  }

  div(className, children, options) {
    const div = this.createDom("div", { className, ...options }, children);
    return div;
  }

  headding(size, children, options) {
    const head = this.createDom(`h${size}`, options, children);
    return head;
  }

  unorderList(className, children, options) {
    const ul = this.createDom("ul", { className, ...options }, children);
    return ul;
  }

  list(className, children, options) {
    const li = this.createDom("li", { className, ...options }, children);
    return li;
  }

  image(className, src = "", alt = "No Image", options) {
    const img = this.createDom("img", { src, alt, className, ...options });
    return img;
  }

  paragraph(className, children, options) {
    const li = this.createDom("p", { className, ...options }, children);
    return li;
  }

  renderDom(children) {
    if (Array.isArray(children)) {
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        this.mainDom.appendChild(child);
      }
      return;
    }
    this.mainDom.appendChild(children);
  }
}

class WfsStyle {
  shortFormList = {
    p: "padding",
    m: "margin",
    r: "right",
    b: "bottom",
    l: "left",
    w: "width",
    h: "height",
    d: "display",
    t: "top"
  };
  constructor() {}

  getStyleObject(object) {
    let style = "";
    Object.keys(object).forEach((item) => {
      const shortForms = item
        .split("")
        .map((i) => this.shortFormList[i])
        .join("-");
      style += `${shortForms}:${object[item]}; `;
    });
    console.log(style);

    return style ? { style } : {};
  }
}
