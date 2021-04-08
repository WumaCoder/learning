var updates = {};

function defineReactive(obj, key, val) {
  updates[key] = [];
  Object.defineProperty(obj, key, {
    get() {
      // console.log("[get]:", key);
      return observe(val);
    },
    set(newVal) {
      if (newVal !== val) {
        // console.log("[set]:", key, newVal);
        val = newVal;
        updates[key].forEach((update) => update());
      }
    },
  });
  return obj;
}

function observe(target) {
  if (target === null || typeof target !== "object") {
    return target;
  }

  if (target.__ob__) {
    return target;
  }

  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key]);
  });

  Object.defineProperty(target, "__ob__", {
    enumerable: false,
    writable: false,
    value: true,
  });

  return target;
}

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = observe(options.data);

    proxy(this.$data, this);

    new Compile(options.el, this);

    options.mounted && options.mounted.call(this);
  }
}

window.Vue = Vue;

function proxy(origin, target) {
  Object.keys(origin).forEach((key) => {
    Object.defineProperty(target, key, {
      get() {
        return origin[key];
      },
      set(v) {
        origin[key] = v;
        window.up1 && up1();
      },
    });
  });
}

class Compile {
  constructor(el, vm) {
    this._vm = vm;
    vm.$el = document.querySelector(el);

    if (vm.$el) {
      this.compile(vm.$el);
    }
  }

  compile(node) {
    node.childNodes &&
      node.childNodes.forEach((node) => {
        if (this.isElement(node)) {
          this.compileElement(node);
        } else if (this.isInterpolation(node)) {
          this.compileText(node);
        }
        this.compile(node);
      });
  }

  compileText(node) {
    const template = node.textContent;
    const update = () => {
      node.textContent = template.replace(/{{(.*)}}/gm, (match, exp) => {
        return this._vm[exp];
      });
    };
    update();
    updates[RegExp.$1].push(update);
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const name = attr.name;
      const exp = attr.value;
      if (this.isDirective(name)) {
        const fn = this[name.substr(2)].bind(this);
        fn && fn(node, exp);
      }
    });
  }

  text(node, exp) {
    const update = () => {
      node.textContent = this._vm[exp];
    };
    update();
    updates[exp].push(update);
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /{{(.*)}}/gm.test(node.textContent);
  }

  isDirective(name) {
    return name.startsWith("v-");
  }
}

// var watchers = [];

// class Watcher {
//   constructor(vm, key, updateFn) {
//     this._vm = vm;
//     this._key = key;
//     this._updateFn = updateFn;
//   }

//   update() {
//     this._updateFn;
//   }
// }
