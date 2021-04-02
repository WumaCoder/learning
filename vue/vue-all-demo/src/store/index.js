import Vue from "vue";
import Vuex from "../lib/vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    prefix: ">",
  },
  getters: {
    prefixCount(state) {
      return state.prefix + state.count;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addPrefix(state) {
      state.prefix += ">";
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});

export default store;
