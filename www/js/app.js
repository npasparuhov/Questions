angular.module('starter', ['ionic',"angular-uuid", 'starter.controllers'])

.run(function($ionicPlatform, uuid) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(localStorage.getItem("uuid") == null) localStorage.setItem('uuid', uuid.v4());
    if(localStorage.getItem("counter") == null) localStorage.setItem('counter', 0);
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('questions', {
    url: '/questions',
    templateUrl: 'templates/questions.html',
    controller: 'QuestionsCtrl'
  })

  .state('galery', {
    url: '/galery',
    templateUrl: 'templates/galery.html',
    controller: 'GaleryCtrl'
  });

  $urlRouterProvider.otherwise('/questions');

});
