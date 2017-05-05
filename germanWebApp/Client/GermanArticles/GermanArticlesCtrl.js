'use strict';
angular
    .module('GermanApp')
     .controller("GameCtrl", function ($scope, $location, $http, $interval) {
         //var paramId = 1;
         //$scope.test = 3;
        // var giftList = ["a", "p", "b", "c", "d", "f", "g", "h", "i", "q", "j", "o", "r"];
         //var giftMilestones = [13,12,11,10,9,8,7,6,5,4,3,2,1];
         var giftList = [ "j", "o", "r"];
         var giftMilestones = [ 3, 2, 1];
        $scope.curDbId = 0;
        $scope.curlistPos = null;
        $scope.score = 0;
        $scope.showCorrect = false;
        $scope.answer;
        var nounsList = [];
        var snglNoun;
        var random;
        var listSize = 5;
        $scope.winner = false;
        $scope.curNoun = {};


         ///SPEECH
        var message;
        speechSynthesis.getVoices();

         ///SPEECH


        $scope.drawCurrentNoun = function() {

            getCurrentNoun();

        };
         //todo add an easter egg when they won

        function checkIfGift() {
            if (giftMilestones.length <= 0) {
                
               // todo hide/display or ngif
       
                $scope.winner = true;

            }
            if ($scope.score === giftMilestones[giftMilestones.length - 1]) {

                $("#giftList").append("<li data-icon='" + giftList[giftList.length - 1] + "'>" + giftList[giftList.length - 1] + "</li>");

                giftMilestones.pop();
                giftList.pop();
                console.log(giftMilestones);



            }

        }


        function getCurrentNoun() {
            if (nounsList.length < 3) {

                fillInList($scope.curDbId,
                    function() {
                        random = Math.floor(Math.random() * nounsList.length);
                        $scope.curlistPos = random;
                        $scope.curNoun = nounsList[random];
                    });

            } else {
                 random = Math.floor(Math.random() * nounsList.length);
                $scope.curlistPos = random;
                $scope.curNoun = nounsList[random];
            }
            
        }

        $scope.checkAnswer = function(btnVal) {

            
            if (btnVal === $scope.curNoun.article) {
                //$("#" + btnVal + "Btn").addClass("correctBtn");//highlight with green when correct TODO find a better way to change btn colors
                $("#" + btnVal + "Btn").css("background-color", "#55D955");
                window.setTimeout(function() {
                    $("#" + btnVal + "Btn").css("background-color", "#A2A2A2");
                }, 300);
                $scope.answer = true;
                //$("#" + btnVal + "Btn").animate({ 'background-color': '#ffddff' }, 'fast');
                if ($scope.curNoun.userAnswers > 2) {
                    var pos = nounsList.indexOf($scope.curNoun);
                    $scope.score++;
                    checkIfGift();
                    nounsList.splice(pos, 1);
                } else {
                    message = new SpeechSynthesisUtterance($scope.curNoun.fullGermanForm);
                    message.lang = "de-DE";
                    var voices = speechSynthesis.getVoices();
                     
                    message.voice = speechSynthesis.getVoices()[1]; //German

                    speechSynthesis.speak(message);
                    $scope.curNoun.userAnswers++;
                }
            } else {
                $scope.answer = false;
               // $("#" + btnVal + "Btn").addClass("wrongBtn");//highlight with green when correct TODO find a better way to change btn colors
                $("#" + btnVal + "Btn").css("background-color", "#FD4343");
                window.setTimeout(function () {
                    $("#" + btnVal + "Btn").css("background-color", "#A2A2A2");
                }, 300);

                $scope.curNoun.userAnswers = 0;
            }

            getCurrentNoun();
            // $scope.showCorrect = false;

            console.log($scope.curNoun);
            console.log(nounsList.length);
           // $("#" + btnVal + "Btn").css("background-color", "white");
        };

 

        //$scope.getNounsByRange =
        function fillInList(curDbId, callback) {

            getNounsFromDb(curDbId, callback);
        };

        function getNounsFromDb(id, callback) {
            $http({
                url: "./Home/getNounsList",
                method: "post",
                data: { number: id }
            })
            .success(function successCallback(data) {
                data.forEach(function (noun) {
                    snglNoun = {
                        alphabetOrder: noun.AlphabetOrder,
                        article: noun.Article,
                        english: noun.English,
                        germanNoArticle: noun.GermanNoArticle,
                        fullGermanForm: noun.FullGermanForm,
                        userAnswers: 0
                    };
                    
                    nounsList.push(snglNoun);
                });
                $scope.curDbId += listSize;
                    callback();
                })
            .error(function errorCallback(error) {
                console.log(error);
            });
                };

    });