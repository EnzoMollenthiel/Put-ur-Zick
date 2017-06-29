angular.module('components')

  .component('playlists', {

    templateUrl: 'client/js/components/playlist/playlists.html',

    controller: function (PlaylistService, playerService, $log, $http) {

      this.$onInit = () => {
        this.getPublicPlaylists();
        this.results = [];
      }

      this.search = () => {
        console.log('le champs de recherche est ' + this.query);
        $http.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: 'AIzaSyCRkX3XPUNcOFOB9aVVUKr4oneXd3mtui0',
            type: 'video',
            maxResults: '8',
            part: 'snippet',
            //fields: 'items/url,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
            q: this.query
          }
        })
          .then((data) => {
            this.data = data.data;
            this.results = this.getResults(this.data);
            console.log(this.results);
          })
          .catch((error) => {
            console.log(error);
            console.log('Search error');
          });
      }

      this.getResults = (data) => {
        this.results.length = 0;
        for (var i = data.items.length - 1; i >= 0; i--) {
          this.results.push({
            music: data.items[i].id.videoId,
            title: data.items[i].snippet.title,
            thumbnail: data.items[i].snippet.thumbnails.default.url
          });
        }
        return this.results;
      }

      this.getPublicPlaylists = () => {
        PlaylistService.getPlayLists().then((list) => {
          this.list = list;
        }).catch((err) => { });

        this.launch = (music, title) => {
          playerService.launchPlayer(music, title);
          playerService.archiveVideo(music, title);
          //playerService.deleteVideo(this.upcoming, url);
          $log.info('Launched id:' + music + ' and title:' + title);
        };

      };
    }
  })

