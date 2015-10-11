var app = angular.module('RPSLS', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
      .when('/', {
    templateUrl: 'home.html'
            })
  
    .when('/rounds', {
        templateUrl: 'rounds.html',
        controller: 'roundsCtrl'
            })
  
    .when('/field',{
        templateUrl: 'field.html',
        controller: 'fieldCtrl'
            })
  
    .when('/exit',{
        templateUrl: 'exit.html',
        controller: 'exitCtrl'
            })
  
    .when('/help',{
        templateUrl: 'help.html'
            });
});

app.controller('roundsCtrl', ['$scope', 'dataFact', '$location', function($scope, dataFact, $location){
    $scope.rounds5 = function(){
        dataFact.total_rounds = 5;
        $location.path('/field');
    }
    
    $scope.rounds3 = function(){
        dataFact.total_rounds = 3;
        $location.path('/field');
    }
    
}]);



app.controller('fieldCtrl', ['$scope', 'dataFact', '$location', function($scope, dataFact, $location){
    
    //Counting clicks
    var clicks = 0;
    
    //Class generator for Bot
    var class_gen = function(){
                                var class_arr_index = Math.floor(Math.random() * 5);
                                $scope.bot.class = $scope.bot.classes[class_arr_index];
                                switch (class_arr_index){
                                    case 0:
                                        $scope.bot.selection = "Rock";
                                        break;
                                    case 1:
                                        $scope.bot.selection = "Paper";
                                        break;
                                    case 2:
                                        $scope.bot.selection = "Scissor";
                                        break;
                                    case 3:
                                        $scope.bot.selection = "Lizard";
                                        break;
                                    case 4:
                                        $scope.bot.selection = "Spock";
                                        break;
                                }
                                  }
    
    
    //Player Object
    $scope.player = {
                     
                     selection: dataFact.player.selection, 
                     score: dataFact.player.score, 
                     class:dataFact.player.class,
                    
                     rock: function(){
                                            clicks += 1;
                                            round_checker();
                                            $scope.player.selection = "Rock";
                                            $scope.player.class = "fa fa-hand-rock-o fa-5x";
                                            class_gen();
                                            fight();
                                        },
                     paper : function(){
                                            clicks += 1;
                                            round_checker();
                                            $scope.player.selection = "Paper";
                                            $scope.player.class = "fa fa-hand-paper-o fa-5x";
                                            class_gen();
                                            fight();
                                        },
                     scissor : function(){
                                            clicks += 1;
                                            round_checker();
                                            $scope.player.selection = "Scissor";
                                            $scope.player.class = "fa fa-hand-scissors-o fa-5x";
                                            class_gen();
                                            fight();
                                        },
                     lizard : function(){
                                            clicks += 1;
                                            round_checker();
                                            $scope.player.selection = "Lizard";
                                            $scope.player.class = "fa fa-hand-lizard-o fa-5x";
                                            class_gen();
                                            fight();
                                        },
                     spock : function(){
                                            clicks += 1;
                                            round_checker();
                                            $scope.player.selection = "Spock";
                                            $scope.player.class = "fa fa-hand-spock-o fa-5x";
                                            class_gen();
                                            fight();
                                        }
                    
                    };
    
    //Bot Object
    $scope.bot = {
                    selection: dataFact.bot.selection, 
                    score: dataFact.bot.score, 
                    class:dataFact.bot.class,
        
                    classes:[
                                "fa fa-hand-rock-o fa-5x",
                                "fa fa-hand-paper-o fa-5x",
                                "fa fa-hand-scissors-o fa-5x",
                                "fa fa-hand-lizard-o fa-5x",
                                "fa fa-hand-spock-o fa-5x"
                            ]
                 };
    
    
    $scope.rounds_selected = dataFact.total_rounds;
    
    //Fighting Function
    
    var fight = function(){
        var bot = $scope.bot.selection;
        var player = $scope.player.selection;
        
        if(player != bot){
            switch (player){
            case "Rock":
                if(bot=="Lizard" || bot=="Scissor"){
                    $scope.player.score += 1;
                } else {
                    $scope.bot.score += 1;
                }
                break;
            case "Paper":
                if(bot=="Rock" || bot=="Spock"){
                    $scope.player.score += 1;
                } else {
                    $scope.bot.score += 1;
                }
                break;
            case "Scissor":
                if(bot=="Paper" || bot=="Lizard"){
                    $scope.player.score += 1;
                } else {
                    $scope.bot.score += 1;
                }
                break;
            case "Lizard":
                if(bot=="Paper" || bot=="Spock"){
                    $scope.player.score += 1;
                } else {
                    $scope.bot.score += 1;
                }
                break;
            case "Spock":
                if(bot=="Rock" || bot=="Scissor"){
                    $scope.player.score += 1;
                } else {
                    $scope.bot.score += 1;
                }
                break;
        }
        
        }
        
        
    }
    
    //Checking if the number of rounds have been achieved
    //Automatic redirect if rounds over

    
    var round_checker = function(){
        $scope.currentRound += 1;
        var total_rounds = $scope.rounds_selected;
        
        if($scope.currentRound == total_rounds){
            scores();
            disable_controls();
            setTimeout(function(){ window.location.href="#exit"; }, 2000);
        } 
        
    }
    
    //Disable all the controls
    var disable_controls = function(){
        document.getElementById("rock").disabled = true;
        document.getElementById("paper").disabled = true;
        document.getElementById("scissor").disabled = true;
        document.getElementById("lizard").disabled = true;
        document.getElementById("spock").disabled = true;
        
    }
    
    //Scores storage into factory
    var scores = function(){
        dataFact.bot.score = $scope.bot.score;
        console.log(dataFact.bot.score);
        dataFact.player.score = $scope.player.score;
        console.log(dataFact.player.score);
    }
    
}]);


app.controller('exitCtrl', ['$scope', 'dataFact', '$window', function($scope, dataFact, $window){
       var winner = function(){
        
        var player = dataFact.player.score;
        var bot = dataFact.bot.score;
        
        if(player>bot){
            return "You won!";
        } else if(bot>player){
            return "You lost!";
        } else {
            return "It's a tie."
        }
        
    } 
    
    $scope.message = winner();
    
    $scope.new_game = function(){
        $window.location.href = "/rpsls";
    }
    
}]);



//Service
app.factory('dataFact', function(){
    var game_data = {};
    
    game_data.total_rounds = 0;
    game_data.bot = {
                    selection:"---",
                    score:0,
                    class:" "
                    };
    game_data.player = {
                    selection:"---",
                    score:0,
                    class:" "
                    };
    
    
    return game_data;
});
