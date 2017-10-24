(function() {
  function LoadPage($ele) {
    this.$el = $ele;
    this.main();
  }

  LoadPage.prototype = {
    main() {
      window.alert('main module');
    }
  }
})();
