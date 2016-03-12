angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('HeroiCtrl', function($scope, $stateParams, $ionicLoading, HeroisService) {
  $ionicLoading.show({
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  });

  $scope.show = false;

  var heroiId = $stateParams.id;
  $scope.heroi = {};

  HeroisService.getHero(heroiId).then(
    function success(res){
      $scope.heroi = res.data.results[0];
      $scope.show = true;
      $ionicLoading.hide();
      console.log(res);
      console.log($scope.heroi);
    },

    function error(err){
      $ionicLoading.hide();
      console.log('Erro');
      console.log(err);
    }
  );
})

.controller('BrowseCtrl', function($scope, $stateParams, $ionicLoading, HeroisService) {
  $scope.herois = [];
  $scope.show = false;

  $ionicLoading.show({
    template: '<ion-spinner icon="spiral"></ion-spinner>'
  });

  HeroisService.getHeroes().then(
    function success(res){
      $ionicLoading.hide();

      $scope.show = true;
      console.log(res);
      $scope.herois = res.data.results;
    },

    function error(err){
      $ionicLoading.hide();

      console.error('Erro');
      console.error(err);
    }
  );
})

.service('HeroisService', function($q, $http) {
  var self = {
    'getHeroes' : function(){
      var d = $q.defer();

      $http.get('http://gateway.marvel.com:80/v1/public/characters?apikey=d0916763ab4a25748179417ef3627a75')
        .success(function(res){
          d.resolve(res);
        })

        .error(function(err){
          d.reject(err);
        })

      return d.promise;
    },

    'getHero' : function(data){
      var d = $q.defer();

      $http.get('http://gateway.marvel.com:80/v1/public/characters/'+data+'?apikey=d0916763ab4a25748179417ef3627a75')
        .success(function(res){
          d.resolve(res);
        })

        .error(function(err){
          d.reject(err);
        })

      return d.promise;
    }
  };

  return self;
});
