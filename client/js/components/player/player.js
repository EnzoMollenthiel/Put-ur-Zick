angular.module('components')

.component('player', {

  templateUrl: 'client/js/components/player/player.html',
  
  bindings:{

  }, 
  
  controller: function () {
    
    this.$onInit = () => {
      this.videoURL = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
    }   
        
  }
})