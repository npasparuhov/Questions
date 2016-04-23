angular.module('starter.controllers', [])

.controller('QuestionsCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, uuid, $state) {

  $rootScope.answeredQuestions = 0;
  $rootScope.counter = localStorage.getItem("counter");
  $rootScope.uuid = localStorage.getItem('uuid');


  $rootScope.questions = [
    {title: "Чували ли сте, за home-automation?", id: 1, answer: ""},
    {title: "Харесва ли ви, идеята да оправлявате ел. уредите си през смартфона ви?", id: 2, answer: ""},
    {title: "Искате ли, да икономисвате пари от ел. енергия и домът ви да бъде енергийно-ефективен?", id: 3, answer: ""},
    {title: "Как ви, се струва идеята - джа-джа да се грижи за комфорта в дома ви и да поддържа температурата у вас?", id: 4, answer: ""},
    {title: "Представяне на идеята ни и какво правим!!!", id: 0, answer: ""},
    {title: "Искате ли, да имате поглед върху дома ви?", id: 5, answer: ""},
    {title: "Искате ли, да знаете какво се случва в дома ви по всяко време, когато не сте вкъщи?", id: 6, answer: ""},
    {title: "Безпокойте ли се, за сигурноста на дома ви и знаете ли какво се случва у вас?", id: 7, answer: ""},
    {title: "Искате ли, да знаете какво правят децата ви или домашния ви любимец сега?", id: 8, answer: ""},
    {title: "Харесва ли ви, идеята да записвате всичко, което става у вас, когато ви няма, но не и когато сте вкъщи?", id: 9, answer: ""},
    {title: "Как ви се струва, да имате възможност да преглеждате случилото се у вас докато ви е нямало?", id: 10, answer: ""},
    {title: "Искате ли, да управлявате ел. уредите си с гласови команди?", id: 11, answer: ""},
    {title: "Как ви се струва идеята, джа-джа да може да ви отговори на всеки ваш въпрос, от колко е часа, какво е времето, до кой е най-близкия магазин?", id: 12, answer: ""}
  ];
  
  $rootScope.reset = false;

  $scope.save = function(answer) {
    if(answer && $rootScope.answeredQuestions<12)$rootScope.answeredQuestions++;
    $ionicSlideBoxDelegate.next();
  }

  $scope.goTo = function(){
    $state.go('galery');
  }

})

.controller('HeaderCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, $state){

  $scope.backToQuestions = false;
  $scope.backToGalery = true;

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  }

  $scope.end = function(){
    $rootScope.counter ++;
    localStorage.setItem('counter', $rootScope.counter);
    localStorage.setItem("anketa"+$rootScope.counter, JSON.stringify($rootScope.questions));
    $ionicSlideBoxDelegate.slide(0);
    alert("End of the quest!");
    $rootScope.reset = true;
    $rootScope.answeredQuestions = 0;
  }

})

.controller('GaleryCtrl', function($scope, $state, $rootScope) {

  var ref = new Firebase ("https://simpledb.firebaseio.com/");
  var uuid = localStorage.getItem('uuid');

  $scope.transferData = function() {
    var counter = localStorage.getItem('counter');
    for(var i=1; i <= counter; i++){
      var data = localStorage.getItem("anketa" + i);
      if(data)ref.child("anketa").child(uuid).child(i).set({id: i, data: data});
    }
    ref.child("anketa").child(uuid).child(counter).on("value", function(){
      for(var i=1; i <= counter; i++)localStorage.removeItem("anketa" + i);
    });
    alert("Your data has been transfered!");
  }

  $scope.goTo = function(){
    $state.go('questions');
  }
});
