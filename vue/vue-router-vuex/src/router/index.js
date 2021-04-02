import Vue from "vue";
import VueRouter from "../lib/vue-router";
import Main from "../layout/Main.vue";
import Admin from "../layout/Admin.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    component: Main,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
