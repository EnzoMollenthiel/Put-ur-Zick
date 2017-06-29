angular.module("services")

  .service("playerService", function ($http, $q, $log, $window, $rootScope) {

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.youtube = {
      ready: false,
      player: null,
      videoId: null,
      videoTitle: null,
      playerHeight: '480',
      playerWidth: '640',
      state: 'playing'
    };

    this.results = [];

    this.history = [
      { music: 'XKa7Ywiv734', title: '[OFFICIAL HD] Daft Punk - Give Life Back To Music (feat. Nile Rodgers)', author: '' }
    ];

    $window.onYouTubeIframeAPIReady = () => {
      $log.info('Youtube API is ready');
      this.youtube.ready = true;
      this.bindPlayer('placeholder');
      this.loadPlayer();
      //$rootScope.$apply();
    };

    onYoutubeReady = (event) => {
      $log.info('YouTube Player is ready');
      this.youtube.player.cueVideoById(this.history[0].music);
      this.youtube.videoUrl = this.history[0].music;
      this.youtube.videoTitle = this.history[0].title;
    }

    onYoutubeStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
        this.youtube.state = 'playing';
      } else if (event.data == YT.PlayerState.PAUSED) {
        this.youtube.state = 'paused';
      } else if (event.data == YT.PlayerState.ENDED) {
        this.youtube.state = 'ended';
        this.launchPlayer(this.upcoming[0].music, this.upcoming[0].title);
        this.archiveVideo(this.upcoming[0].music, this.upcoming[0].title);
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

    this.launchPlayer = (music, title) => {
      this.youtube.player.loadVideoById(music);
      this.youtube.videoId = music;
      this.youtube.videoTitle = title;
      console.log(this.youtube.videoUrl)
      return this.youtube;
    }

    this.queueVideo = (music, title, author) => {
      this.upcoming.push({
        id: music,
        title: title,
        author: author
      });
      return this.upcoming;
    };

    this.archiveVideo = (music, title, author) => {
      this.history.unshift({
        id: music,
        title: title,
        author: author
      });
      return this.history;
    };

    this.deleteVideo = (list, music) => {
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].music === music) {
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