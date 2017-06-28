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
});

