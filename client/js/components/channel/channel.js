angular.module('components')

.component('channel', {
  
  templateUrl: 'client/js/components/channel/channel.html',
  
  bindings:{
    // musics : '<'
  }, 
  
  controller: function (PlaylistService) {
    
    this.$onInit = () => {
      this.musics =[ {
        title : 'title',
        message : 'message'
      },{
        title : 'jaja',
        message : 'lala'
      }
      ]
      
    }   
    
    this.post = () => {
      console.log(this.form)
      PlaylistService.post(this.form).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      })
    }
    
  }
})