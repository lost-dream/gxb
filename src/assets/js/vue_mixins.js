const mixins = {
  methods: {
    JumpTo(routerName, routerQuery) {
      this.$router.push({
        name: routerName,
        query: routerQuery
      });
    }
  }
};

export default mixins;
