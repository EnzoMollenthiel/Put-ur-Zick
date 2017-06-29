const PLAYLIST_URL = 'http://localhost:3000/playlist';

angular.module("services")

  .service("PlaylistService", function ($http, $q) {
    const SERVER_URL = "http://localhost:3000/playlist";

    this.getPlayLists = () => {
      var defer = $q.defer();
      $http.get(SERVER_URL).then((items) => {
        defer.resolve(items.data);
      })
        .catch((err) => {
          defer.reject(err);
        });
      return defer.promise;
    };


    this.get = (id) => {
      return $q((resolve, reject) => {
        $http.get(PLAYLIST_URL + id).then((response) => {
          resolve(response.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    }

    this.post = (music) => {
      return $q((resolve, reject) => {
        $http.post(PLAYLIST_URL + id, music).then((response) => {
          resolve(response.data);
        })
          .catch((err) => {
            reject(err);
          });
      });
    }

  });