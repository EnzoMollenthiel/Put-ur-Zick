angular.module('components')

  .component('playlist', {

    templateUrl: 'js/components/playlist/playlist.html',

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