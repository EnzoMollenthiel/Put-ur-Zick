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
      videoId: null,
      videoTitle: null,
      playerHeight: '480',
      playerWidth: '640',
      state: 'stopped'
    };

    this.results = [];

    this.upcoming = [
      { id: 'kRJuY6ZDLPo', title: 'La Roux - In for the Kill (Twelves Remix)' },
      { id: '45YSGFctLws', title: 'Shout Out Louds - Illusions' },
      { id: 'ktoaj1IpTbw', title: 'CHVRCHES - Gun' },
      { id: '8Zh0tY2NfLs', title: 'N.E.R.D. ft. Nelly Furtado - Hot N\' Fun (Boys Noize Remix) HQ' },
      { id: 'zwJPcRtbzDk', title: 'Daft Punk - Human After All (SebastiAn Remix)' },
      { id: 'sEwM6ERq0gc', title: 'HAIM - Forever (Official Music Video)' },
      { id: 'fTK4XTvZWmk', title: 'Housse De Racket â˜â˜€â˜ Apocalypso' }
    ];

    this.history = [
      { id: 'XKa7Ywiv734', title: '[OFFICIAL HD] Daft Punk - Give Life Back To Music (feat. Nile Rodgers)' }
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
      this.youtube.player.cueVideoById(this.history[0].id);
      this.youtube.videoId = this.history[0].id;
      this.youtube.videoTitle = this.history[0].title;
    }

    onYoutubeStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
        this.youtube.state = 'playing';
      } else if (event.data == YT.PlayerState.PAUSED) {
        this.youtube.state = 'paused';
      } else if (event.data == YT.PlayerState.ENDED) {
        this.youtube.state = 'ended';
        this.launchPlayer(this.upcoming[0].id, this.upcoming[0].title);
        this.archiveVideo(this.upcoming[0].id, this.upcoming[0].title);
        this.deleteVideo(this.upcoming, this.upcoming[0].id);
      }
      $rootScope.$apply();
    }

    this.bindPlayer = (elementId) => {
      $log.info('Binding to ' + elementId);
      this.youtube.playerId = elementId;
    };

    this.createPlayer = () => {
      $log.info('Creating a new Youtube player for DOM id ' + this.youtube.playerId + ' and video ' + this.youtube.videoId);
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

    this.launchPlayer = (id, title) => {
      this.youtube.player.loadVideoById(id);
      this.youtube.videoId = id;
      this.youtube.videoTitle = title;
      return this.youtube;
    }

    listResults = (data) => {
      this.results.length = 0;
      console.log(data);
      for (var i = data.items.length - 1; i >= 0; i--) {
        this.results.push({
          id: data.items[i].id.videoId,
          title: data.items[i].snippet.title,
          description: data.items[i].snippet.description,
          thumbnail: data.items[i].snippet.thumbnails.default.url,
          author: data.items[i].snippet.channelTitle
        });
      }
      return this.results;
    }

    this.queueVideo = (id, title) => {
      this.upcoming.push({
        id: id,
        title: title
      });
      return this.upcoming;
    };

    this.archiveVideo = (id, title) => {
      this.history.unshift({
        id: id,
        title: title
      });
      return this.history;
    };

    this.deleteVideo = (list, id) => {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].id === id) {
          list.splice(i, 1);
          break;
        }
      }
    };

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