angular.module('components')

.component('playlist', {

  templateUrl: 'client/js/components/channel/channel.html',
  
  bindings:{
    musics : '<'
  }, 
  
  controller: function () {
    
    this.$onInit = () => {
      console.log(this.musics)
    }   
        
  }
})