angular.module('components')

.component('playlist', {

  templateUrl: 'client/js/components/player/player.html',
  
  bindings:{

  }, 
  
  controller: function () {
    
    this.$onInit = () => {
      this.videoURL = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
    }   
        
  }
})