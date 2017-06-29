angular.module('components')

  .component('main', {

    templateUrl: 'client/js/components/main/main.html',

    bindings: {

    },

    controller: function () {

      this.$onInit = () => {
      }
      // $(document).ready(function () {
      //   //Handles menu drop down
      //   // $('.dropdown-menu').find('form').click(function (e) {
      //   //   e.stopPropagation();
      //   // });
      // });
    }
  })