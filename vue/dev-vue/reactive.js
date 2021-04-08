function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("[get]:", key);
      return observe(val);
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("[set]:", key, newVal);
        val = newVal;
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

const obj = observe({
  count: 1,
  o: 1,
});

console.log(obj.o);

obj.o = {
  a: 1,
  b: 2,
};

// obj.o.a;
console.log(obj.o);

console.log(obj.o.c);
