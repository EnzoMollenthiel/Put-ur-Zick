const PLAYLIST_URL = '';

angular.module("services")

.service("PlaylistService", function ($http, $q) {
  
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
  
});