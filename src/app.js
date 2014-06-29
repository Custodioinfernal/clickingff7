'use strict';

/**
 * App module
 * @type {object}
 */
var app = angular.module('clickingff7', ['ngRoute', 'ngCookies', 'pascalprecht.translate']);

/**
 * Game Service
 */
app.factory('Game', ['$rootScope', '$cookieStore', '$http', '$timeout', '$translate',
    function ($rootScope, $cookieStore, $http, $timeout, $translate) {
        return new Game($rootScope, $cookieStore, $http, $timeout, $translate);
    }]);

/**
 * Routes logic
 */
app.config(['$routeProvider', '$translateProvider',
    function ($routeProvider, $translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $routeProvider.
            when('/game', {
                templateUrl: 'partials/game.html',
                controller : 'GameCtrl'
            }).
            when('/map', {
                templateUrl: 'partials/map.html',
                controller : 'MapCtrl'
            }).
            when('/shop', {
                templateUrl: 'partials/shop.html',
                controller : 'ShopCtrl'
            }).
            when('/items', {
                templateUrl: 'partials/items.html',
                controller : 'ItemsCtrl'
            }).
            when('/weapons', {
                templateUrl: 'partials/weapons.html',
                controller : 'WeaponsCtrl'
            }).
            when('/materias', {
                templateUrl: 'partials/materias.html',
                controller : 'MateriasCtrl'
            }).
            when('/config', {
                templateUrl: 'partials/config.html',
                controller : 'ConfigCtrl'
            }).
            when('/save', {
                templateUrl: 'partials/save.html',
                controller : 'SaveCtrl'
            }).
            otherwise({
                redirectTo: '/game'
            });
    }
]);

app.filter('time', function () {
    return function (elapsed) {
        var hours = Math.floor(elapsed / 3600);
        elapsed -= hours * 3600;

        var minutes = Math.floor(elapsed / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        var seconds = elapsed - minutes * 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    };
});

/**
 * INDEX
 */

app.controller('IndexCtrl', function ($scope, $location, Game) {

    $scope.gameFn = function () {
        return Game.mode;
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    /**
     * Go to the game
     */
    $scope.goGame = function () {
        $location.path("/game");
    };

    /**
     * Go to the map
     */
    $scope.goMap = function () {
        if (!Game.battle.isBattle) {
            $location.path("/map");
        }
    };

    /**
     * Go to the shop
     */
    $scope.goShop = function () {
        if (!Game.battle.isBattle) {
            $location.path("/shop");
        }
    };

    /**
     * Go to the items
     */
    $scope.goItems = function () {
        if (!Game.battle.isBattle) {
            $location.path("/items");
        }
    };

    /**
     * Go to the weapons
     */
    $scope.goWeapons = function () {
        if (!Game.battle.isBattle) {
            $location.path("/weapons");
        }
    };

    /**
     * Go to the materias
     */
    $scope.goMaterias = function () {
        if (!Game.battle.isBattle) {
            $location.path("/materias");
        }
    };

    /**
     * Go to the game configuration
     */
    $scope.goConfig = function (ev) {
        if (!Game.battle.isBattle) {
            $location.path("/config");
        }
    };

    /**
     * Save the game
     */
    $scope.goSave = function (ev) {
        if (!Game.battle.isBattle) {
            $location.path("/save");
        }
    };

});

/**
 * /Game
 */

app.controller('GameCtrl', function ($rootScope, Game) {

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

});

/**
 * /Map
 */

app.controller('MapCtrl', function () {
});

/**
 * /Shop
 */

app.controller('ShopCtrl', function ($scope, Game) {

    $scope.changeSection = function (s) {
        Game.shop.section = s;
    };

    $scope.changeType = function (t) {
        Game.shop.type = t;
    };

});

/**
 * /Items
 */

app.controller('ItemsCtrl', function () {
});

/**
 * /Weapons
 */

app.controller('WeaponsCtrl', function () {
});

/**
 * /Materias
 */

app.controller('MateriasCtrl', function () {
});

/**
 * /Config
 */

app.controller('ConfigCtrl', function ($scope, $rootScope, $translate, Game) {

    $scope.changeLanguage = function () {
        var language = $('#language').val();
        Game.language = language;
        $translate.use(language);
    };

});

/**
 * /Save
 */

app.controller('SaveCtrl', function ($scope, $rootScope, Game) {

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
            $('#area-import').hide();
            $('#area-export').show();
            $scope.areaExport = btoa(JSON.stringify(s));
        }
    };

    /**
     * Export the current game
     */
    $rootScope.exportCurrentGame = function (ev) {
        $scope.areaExport = btoa(JSON.stringify(Game.export()));
        $('#area-import').hide();
        $('#area-export').show();
    };

    /**
     * Show import area
     */
    $rootScope.showImport = function (ev) {
        $('#area-export').hide();
        $('#area-import').show();
    };

    /**
     * Import a save
     */
    $rootScope.importSave = function (ev) {
        if ($scope.areaImport && confirm('Are you sure ? You\'ll lose your current save !')) {
            var save = JSON.parse(atob($scope.areaImport));
            Game.load(save);
        }
    };

});