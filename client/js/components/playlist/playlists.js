angular.module('components')

  .component('playlists', {

    templateUrl: 'client/js/components/playlist/playlists.html',

    bindings: {
      query: '<'
    },

    controller: function (PlaylistService, playerService) {

      this.$onInit = () => {
        this.getPublicPlaylists();
  
      }

      this.getPublicPlaylists = () => {
        PlaylistService.getPlayLists().then((list) => {
          this.list = list;
        }).catch((err) => { });

      };
    }
  })

