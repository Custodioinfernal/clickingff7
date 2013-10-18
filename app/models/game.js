/**
 * Game class
 */

function Game($scope) {};

/**
 * Init the game
 * @param {object} $scope
 * @param {object} infos
 */
Game.prototype.init = function($scope, infos) {
  this.$scope = $scope;

  // general INFOS
  this.extends({
    "general": {
      "total_enemy_pwr": 0,
      "total_xp": 0,
      "total_gils": 0,
      "rate_enemy_pwr": 0,
      "rate_xp": 0,
      "rate_gils": 0
    },
    "zone": {
      "level": 1
    },
    "enemy": {},
    "characters": {}
  });

  // INFOS from COOKIE
  if (infos) {
    this.extends(infos);
  }
};

/**
 * Extends the properties with new ones
 * @param  {object} infos
 */
Game.prototype.extends = function(infos) {
  var i, j, self = this;
  for (i in infos) {
    if (!(i in self)) {
      self[i] = {};
    }
    for (j in infos[i]) {
      self[i][j] = infos[i][j];
    }
  }
};

Game.prototype.run = function($timeout) {
  var self = this;
  this.timer = $timeout(function() {
    self.$scope.total_enemy_pwr += self.general.rate_enemy_pwr;
    self.$scope.total_xp += self.general.rate_xp;
    self.$scope.total_gils += self.general.rate_gils;
    self.run($timeout);
  }, 1000);
};

/**
 * Refresh enemy & characters infos
 */
Game.prototype.refresh = function() {
  var l_enemy = this.$scope.enemy;
  var enemy = {};
  enemy.rate_enemy_pwr = 0;
  enemy.rate_xp = 0;
  enemy.rate_gils = 0;
  for (var i in l_enemy) {
    if (l_enemy[i].number == 0) continue;
    enemy.rate_xp += l_enemy[i].get_xp();
    enemy.rate_gils += l_enemy[i].get_gils();
    enemy.rate_enemy_pwr += enemy.rate_xp + enemy.rate_gils;
  }
  this.general.rate_xp = this.$scope.rate_xp = enemy.rate_xp;
  this.general.rate_gils = this.$scope.rate_gils = enemy.rate_gils;

  var l_characters = this.$scope.characters;
  var characters = {};
  characters.rate_enemy_pwr = 0;
  for (var i in l_characters) {
    if (l_characters[i].level == 0) continue;
    characters.rate_enemy_pwr += l_characters[i].get_hits();
  }
  this.general.rate_enemy_pwr = this.$scope.rate_enemy_pwr = characters.rate_enemy_pwr - enemy.rate_enemy_pwr;
};