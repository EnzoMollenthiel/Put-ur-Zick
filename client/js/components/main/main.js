angular.module('components')

  .component('main', {

    templateUrl: 'client/js/components/main/main.html',

    bindings: {

    },

    controller: function ($http) {

      this.$onInit = () => {
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
            console.log(data);
            this.listResults(data);
          })
          .catch(() => {
            console.log('Search error');
          });
      }

      this.listResults = (data) => {
        this.results.length = 0;
        console.log(data);
        for (var i = data.items.length - 1; i >= 0; i--) {
          this.results.push({
            url: data.items[i].id.videoId,
            title: data.items[i].snippet.title,
            description: data.items[i].snippet.description,
            thumbnail: data.items[i].snippet.thumbnails.default.url,
            author: data.items[i].snippet.channelTitle
          });
        }
        return this.results;
      }
    }
  })