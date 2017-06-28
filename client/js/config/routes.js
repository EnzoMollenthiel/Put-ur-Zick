angular.module('config')

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state({
        name: 'home',
        url: '/home',
        component: 'home'
      })
      .state({
        name: 'playlist',
        url: '/playlist/:id',
        component: 'playlist',
        resolve: {

        }
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