<script>
export default {
  props: {
    to: {
      type: String,
    },
  },
  render(h) {
    return h(
      "a",
      {
        attrs: {
          href: "/#" + this.to,
        },
      },
      this.$slots.default
    );
  },
};
</script>
