'use strict';

/**
 * App module
 * @type {object}
 */
var app = angular.module('clickingff7', ['ngRoute', 'ngCookies']);

/**
 * Game Service
 */
app.factory('Game', ['$rootScope', '$cookieStore', '$http', '$timeout', function ($rootScope, $cookieStore, $http, $timeout) {
    return new Game($rootScope, $cookieStore, $http, $timeout);
}]);

/**
 * Routes logic
 */
app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.
            when('/game', {
                templateUrl: 'partials/game.html',
                controller : GameCtrl
            }).
            when('/map', {
                templateUrl: 'partials/map.html',
                controller : MapCtrl
            }).
            when('/items', {
                templateUrl: 'partials/items.html',
                controller : ItemsCtrl
            }).
            when('/materias', {
                templateUrl: 'partials/materias.html',
                controller : MateriasCtrl
            }).
            when('/save', {
                templateUrl: 'partials/save.html',
                controller : SaveCtrl
            }).
            otherwise({
                redirectTo: '/game'
            });
    }
]);

/**
 * NAV
 */

function NavCtrl($scope, $location, Game) {

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    /**
     * Go to the game
     */
    $scope.game = function () {
        $location.path("/game");
    };

    /**
     * Go to the map
     */
    $scope.map = function () {
        if (!Game.battle.isBattle) {
            $location.path("/map");
        }
    };

    /**
     * Go to the items
     */
    $scope.items = function () {
        if (!Game.battle.isBattle) {
            $location.path("/items");
        }
    };

    /**
     * Go to the materias
     */
    $scope.materias = function () {
        if (!Game.battle.isBattle) {
            $location.path("/materias");
        }
    };

    /**
     * Save the game
     */
    $scope.save = function (ev) {
        if (!Game.battle.isBattle) {
            $location.path("/save");
        }
    };

}

/**
 * /Game
 */

function GameCtrl($rootScope, Game) {

    /**
     * Explore for fight
     */
    $rootScope.explore = function (ev) {
        if (!Game.battle.isBattle) {
            Game.battle.start();
        }
    };

    /**
     * Attack manually enemy
     */
    $rootScope.attack = function (ev) {
        if (Game.characters.canAttack()) {
            // stop autoAttacking
            Game.characters.stopFighting();

            var hits = Game.characters.getHits();
            var d = Math.pow(10, 2);
            hits = Math.round(hits * d) / d;
            // checks limit
            if (Game.characters.canLimit()) {
                hits *= 2;
                Game.characters.limit = 0;
            }
            Game.enemies.getAttacked(hits, false);
            Game.characters.autoFighting();
        }
    };

    /**
     * Escape fight
     */
    $rootScope.escape = function (ev) {
        if (Game.characters.canEscape()) {
            Game.characters.escape();
        }
    };

}

/**
 * /Map
 */

function MapCtrl() {}

/**
 * /Items
 */

function ItemsCtrl() {}

/**
 * /Materias
 */

function MateriasCtrl() {}

/**
 * /Save
 */

function SaveCtrl($scope, $rootScope, Game) {

    /**
     * Save the game
     */
    $rootScope.saveGame = function (ev) {
        Game.save();
    };

    /**
     * Reset the game
     */
    $rootScope.resetGame = function (ev) {
        if (confirm('Are you sure ? You\'ll lose everything !')) {
            Game.reset();
            location.reload();
        }
    };

    /**
     * Export the current save
     */
    $rootScope.exportLastSave = function (ev) {
        var s;
        if (s = Game.saves[0]) {
            $scope.area = btoa(JSON.stringify(s));
        }
    };

    /**
     * Export the current game
     */
    $rootScope.exportCurrentGame = function (ev) {
        $scope.area = btoa(JSON.stringify(Game.export()));
    };

    /**
     * Import a save
     */
    $rootScope.importSave = function (ev) {
        if ($scope.area && confirm('Are you sure ? You\'ll lose your current save !')) {
            var save = JSON.parse(atob($scope.area));
            Game.load(save);
        }
    };

}