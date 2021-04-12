import RouterLink from "./components/RouterLink.vue";
import RouterView from "./components/RouterView.vue";

let Vue;

class VueRouter {
  constructor(options) {
    this.routes = options.routes;

    Vue.util.defineReactive(
      this,
      "currentPath",
      window.location.hash.substr(1)
    );

    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash.substr(1);
    });
  }

  get matched() {
    const match = this.currentPath.match(/\/[\w]*/gim);
    const result = [];
    let routes = this.routes;
    for (let i = 0; i < match.length; i++) {
      const matchItem = match[i];
      if (!routes) break;
      for (let j = 0; j < routes.length; j++) {
        const routeItem = routes[j];
        if (routeItem.path == matchItem) {
          result.push(routeItem);
          routes = routeItem.children || [];
          break;
        }
      }
    }

    return result;
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  Vue.component("router-link", RouterLink);
  Vue.component("router-view", RouterView);
}

VueRouter.install = install;

export default VueRouter;
