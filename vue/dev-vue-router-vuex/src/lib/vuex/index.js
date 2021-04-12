let Vue;

class Store {
  constructor(options) {
    const vm = new Vue({
      data: {
        $$state: options.state,
      },
      computed: Object.keys(options.getters).reduce((computed, key) => {
        computed[key] = options.getters[key].bind(this, options.state);
        return computed;
      }, {}),
    });
    this._vm = vm;

    this.commit = (type, payload) => {
      options.mutations[type].call(this, options.state, payload);
    };

    this.dispatch = (type, payload) => {
      options.actions[type].call(this, this, payload);
    };
  }

  get state() {
    return this._vm._data.$$state;
  }

  get getters() {
    return this._vm;
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default { Store, install };
