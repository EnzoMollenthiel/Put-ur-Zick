angular.module('config')

.config(function ($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
  .state({
    name: 'home',
    url: '/home',
    component: 'home',
    // resolve: {
    //   musics : ($stateParams, PlaylistService) => {
    //     return PlaylistService.get();
    //   }
    // }
  })
  .state({
    name: 'channel',
    url: '/channel/:id',
    component: 'channel',
    // resolve: {
    //   musics : ($stateParams, PlaylistService) => {
    //     return PlaylistService.get($stateParams.id);
    //   }
    // }
  })
  .state({
    name: 'profile',
    url: '/profile/:id',
    component: 'profile',
    resolve: {
      
    }
  })
  .state({
    name: 'login',
    url: '/login',
    component: 'login'
  })
  
  $urlRouterProvider.otherwise('/home')
})