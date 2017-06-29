angular.module('app', [
  'ui.router',
  'components',
  'services',
  'config'
])

angular.module('app').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
            var video_id = url.split('v=')[1].split('&')[0];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);