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

      this.launch = (id, title) => {
        playerService.launchPlayer(id, title);
        playerService.archiveVideo(id, title);
        //playerService.deleteVideo(this.upcoming, url);
        $log.info('Launched id:' + id + ' and title:' + title);
      };

      this.queue = (id, title) => {
        playerService.queueVideo(id, title);
        playerService.deleteVideo(this.history, id);
        $log.info('Queued id:' + id + ' and title:' + title);
      };

      this.delete = (list, id) => {
        playerService.deleteVideo(list, id);
      };

      this.tabulate = (state) => {
        this.playlist = state;
      }

    }
  })
