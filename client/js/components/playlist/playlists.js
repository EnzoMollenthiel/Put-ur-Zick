angular.module('components')

  .component('playlists', {

    templateUrl: 'client/js/components/playlist/playlists.html',

    bindings: {

    },

    controller: function (PlaylistService) {

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

