angular.module('components')

  .component('player', {

    templateUrl: 'client/js/components/player/player.html',

    bindings: {
      upcoming: '<',
    },

    controller: function ($scope, $http, $log, playerService) {

      this.$onInit = () => {
        console.log(this.upcoming);
        this.youtube = playerService.getYoutube();
        console.log(this.youtube);
        this.results = playerService.getResults();
       // this.upcoming = playerService.getUpcoming();
        this.history = playerService.getHistory();
        this.playlist = true;
      }

      this.launch = (url, title) => {
        playerService.launchPlayer(url, title);
        playerService.archiveVideo(url, title);
       playerService.deleteVideo(this.upcoming, url);
        $log.info('Launched url:' + url + ' and title:' + title);
      };

      this.queue = (url, title) => {
        playerService.queueVideo(url, title);
        playerService.deleteVideo(this.history, url);
        $log.info('Queued id:' + url + ' and title:' + title);
      };

      this.delete = (list, url) => {
        playerService.deleteVideo(list, url);
      };

       this.tabulate = (state) => {
        this.playlist = state;
      }

    }
  })
