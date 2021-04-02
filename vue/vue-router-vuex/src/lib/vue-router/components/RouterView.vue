<script>
export default {
  name: "RouterView",
  props: {
    name: {
      type: String,
      default: "default",
    },
  },
  render(h) {
    const router = this.$router;
    let parent = this.$parent;

    this.$data._routerView = true;

    let depth = 0;
    while (parent && parent.$root !== parent) {
      const data = parent.$data || {};
      if (data._routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    return h(router.matched[depth].component);
  },
};
</script>
