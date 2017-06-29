angular.module('components')

  .component('player', {

    templateUrl: 'client/js/components/player/player.html',

    bindings: {

    },

    controller: function ($scope, $http, $log, playerService) {

      this.$onInit = () => {
        this.youtube = playerService.getYoutube();
        console.log(this.youtube);
        this.results = playerService.getResults();
        this.upcoming = playerService.getUpcoming();
        this.history = playerService.getHistory();
        this.playlist = true;

      }

      this.launch = (id, title) => {
        playerService.launchPlayer(id, title);
        playerService.archiveVideo(id, title);
        playerService.deleteVideo(this.upcoming, id);
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

      this.search = () => {
        $http.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: 'AIzaSyCRkX3XPUNcOFOB9aVVUKr4oneXd3mtui0',
            type: 'video',
            maxResults: '8',
            part: 'id,snippet',
            fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
            q: this.query
          }     
        })
          .then((data)=> {
           playerService.listResults(data);
           $log.info(data);
          })
          .catch(() => {
          $log.info('Search error');
          });
      }

      this.tabulate = (state) => {
        this.playlist = state;
      }

    }
  })
