angular.module('components')

  .component('main', {

    templateUrl: 'client/js/components/main/main.html',

    bindings: {

    },

    controller: function (playerService) {

      this.$onInit = () => {
      }
    }
  })