angular.module("services")

  .service("playerService", function ($http, $q, $log, $window, $rootScope) {

    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.youtube = {
      ready: false,
      player: null,
      playerId: null,
      videoUrl: null,
      videoTitle: null,
      playerHeight: '480',
      playerWidth: '640',
      state: 'playing'
    };

    this.results = [];

    this.history = [
      { id: 0, url: 'http://www.youtube.com/watch?v=XKa7Ywiv734', title: '[OFFICIAL HD] Daft Punk - Give Life Back To Music (feat. Nile Rodgers)', author: '' }
    ];

    $window.onYouTubeIframeAPIReady = () => {
      $log.info('Youtube API is ready');
      this.youtube.ready = true;
      this.bindPlayer('placeholder');
      this.loadPlayer();
      $rootScope.$apply();
    };

    onYoutubeReady = (event) => {
      $log.info('YouTube Player is ready');
      this.youtube.player.cueVideoByUrl(this.history[0].url);
      this.youtube.videoUrl = this.history[0].url;
      this.youtube.videoTitle = this.history[0].title;
    }

    onYoutubeStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
        this.youtube.state = 'playing';
      } else if (event.data == YT.PlayerState.PAUSED) {
        this.youtube.state = 'paused';
      } else if (event.data == YT.PlayerState.ENDED) {
        this.youtube.state = 'ended';
        this.launchPlayer(this.upcoming[0].url, this.upcoming[0].title);
        this.archiveVideo(this.upcoming[0].url, this.upcoming[0].title);
        this.deleteVideo(this.upcoming, this.upcoming[0].id);
      }
      $rootScope.$apply();
    }

    this.bindPlayer = (elementId) => {
      $log.info('Binding to ' + elementId);
      this.youtube.playerId = elementId;
    };

    this.createPlayer = () => {
      $log.info('Creating a new Youtube player for DOM id ' + this.youtube.playerId + ' and video ' + this.youtube.videoUrl);
      return new YT.Player(this.youtube.playerId, {
        height: this.youtube.playerHeight,
        width: this.youtube.playerWidth,
        playerVars: {
          rel: 0,
          showinfo: 0
        },
        events: {
          'onReady': onYoutubeReady,
          'onStateChange': onYoutubeStateChange
        }
      });
    };

    this.loadPlayer = () => {
      if (this.youtube.ready && this.youtube.playerId) {
        if (this.youtube.player) {
          this.youtube.player.destroy();
        }
        this.youtube.player = this.createPlayer();
      }
    };

    this.launchPlayer = (url, title) => {
      this.youtube.player.loadVideoByUrl(url);
      this.youtube.videoUrl = url;
      this.youtube.videoTitle = title;
      console.log(this.youtube.videoUrl)
      return this.youtube;
    }

    this.listResults = (data) => {
      this.results.length = 0;
      console.log(data);
      for (var i = data.items.length - 1; i >= 0; i--) {
        this.results.push({
          url: data.items[i].id.videoUrl,
          title: data.items[i].snippet.title,
          description: data.items[i].snippet.description,
          thumbnail: data.items[i].snippet.thumbnails.default.url,
          author: data.items[i].snippet.channelTitle
        });
      }
      return this.results;
    }

    this.queueVideo = (id, url, title, author) => {
      this.upcoming.push({
        id: id,
        url: url,
        title: title,
        author: author
      });
      return this.upcoming;
    };

    this.archiveVideo = (id, url, title, author) => {
      this.history.unshift({
        id: id,
        url: url,
        title: title,
        author: author
      });
      return this.history;
    };

    deleteVideo = (list, id) => {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].id === id) {
          list.splice(i, 1);
          break;
        }
      }
    };

    this.search = () => {
      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyCRkX3XPUNcOFOB9aVVUKr4oneXd3mtui0',
          type: 'video',
          maxResults: '8',
          part: 'id,snippet',
          fields: 'items/url,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: this.query
        }
      })
        .then((data) => {
          playerService.listResults(data);
          $log.info(data);
        })
        .catch(() => {
          $log.info('Search error');
        });
    }

    this.getYoutube = () => {
      return this.youtube;
    };

    this.getResults = () => {
      return this.results;
    };

    this.getUpcoming = () => {
      return this.upcoming;
    };

    this.getHistory = () => {
      return this.history;
    };

  });