angular.module('components')

  .component('player', {

    templateUrl: 'client/js/components/player/player.html',

    bindings: {
      upcoming: '<',
    },

    controller: function ($log, playerService) {

      this.$onInit = () => {
        this.youtube = playerService.getYoutube();
        console.log(this.youtube);
        this.results = playerService.getResults();
        console.log(this.upcoming);
        this.history = playerService.getHistory();
        console.log(this.history);
        this.playlist = true;
      }

      this.launch = (music, title) => {
        playerService.launchPlayer(music, title);
        playerService.archiveVideo(music, title);
        //playerService.deleteVideo(this.upcoming, url);
        $log.info('Launched id:' + music + ' and title:' + title);
      };

      this.queue = (music, title) => {
        playerService.queueVideo(music, title);
        playerService.deleteVideo(this.history, music);
        $log.info('Queued id:' + music + ' and title:' + title);
      };

      this.delete = (list, music) => {
        playerService.deleteVideo(list, music);
      };

      this.tabulate = (state) => {
        this.playlist = state;
      }

    }
  })
