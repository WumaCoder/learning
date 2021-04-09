function defineReactive(obj, key, val) {
  const dep = new Dep();
  obj.__ob__.deps.push(dep);

  Object.defineProperty(obj, key, {
    get() {
      // console.log("[get]:", key);
      Dep.target && dep.addDep(Dep.target);
      return observe(val);
    },
    set(newVal) {
      if (newVal !== val) {
        // console.log("[set]:", key, newVal);
        val = newVal;
        dep.notify();
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

  new Observer(target);

  return target;
}

class Observer {
  constructor(value) {
    this.value = value;
    this.deps = [];

    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      writable: false,
      value: this,
    });

    this.reactive();
  }

  reactive() {
    Object.keys(this.value).forEach((key) => {
      defineReactive(this.value, key, this.value[key]);
    });
  }
}

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = observe(options.data);

    proxy(this.$data, this);

    this._compile = new Compile(options.el, this);

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
      },
    });
  });
}

class Compile {
  constructor(el, vm) {
    this._vm = vm;
    this._watchers = [];
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
    this.update("interpolation", node, RegExp.$1);
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const name = attr.name;
      const exp = attr.value;
      if (this.isDirective(name)) {
        this.update(name.substr(2) + "Directive", node, exp);
      }
    });
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

  update(type, node, exp) {
    let updater = this[type + "Updater"];
    if (updater) {
      updater = updater.bind(this);
      updater(node, this._vm[exp], exp);
      this._watchers.push(
        new Watcher(this._vm, exp, function () {
          updater(node, this[exp], exp);
        })
      );
    }
  }

  interpolationUpdater(node, uptVal, exp) {
    const template =
      node.originTextContent || (node.originTextContent = node.textContent);
    node.textContent = template.replace(/{{(.*)}}/gm, (match, _exp) => {
      return this._vm[_exp];
    });
  }

  textDirectiveUpdater(node, uptVal, exp) {
    node.textContent = uptVal;
  }
}

class Watcher {
  constructor(vm, exp, updateFn) {
    this._vm = vm;
    this._key = exp;
    this._updateFn = updateFn;

    Dep.target = this;
    vm[exp];
    Dep.target = null;
  }

  update() {
    this._updateFn.call(this._vm);
  }
}

class Dep {
  constructor() {
    this.watchers = [];
  }

  addDep(watcher) {
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach((w) => w.update());
  }
}
