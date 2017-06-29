angular.module('components')

.component('playlists', {
  
  templateUrl: 'client/js/components/playlist/playlists.html',
  
  bindings: {
    query: '<'
  },
  
  controller: function (PlaylistService, playerService, UsersService) {
    
    this.$onInit = () => {
      this.getPublicPlaylists();
      console.log(this)
    }
    
    this.getPublicPlaylists = () => {
      PlaylistService.getPlayLists().then((list) => {
        this.result = list;
      }).catch((err) => {
        console.log(err)
      });
    };
  }
})

