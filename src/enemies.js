/**
 * Characters class
 * @param {object} Game
 */

class Enemies {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.list = [];
        this.timer = {};
    }

    /**
     * Pick a random number of enemies of the current zone
     * @return {[type]} [description]
     */
        random() {
        var enemies = this.game.zones.current().enemies;
        var enemy = _.sample(enemies, 1);
        this.list.push(enemy[0]);
    }

    /**
     * Refresh all the enemy
     */
        refresh() {
        this.hpMax = 0;
        this.hits = 0;

        var enemies = this.list;
        for (var i in enemies) {
            // HP
            this.hpMax += enemies[i].getHpMax();
            this.hits += enemies[i].getHits();
        }

        this.hp = this.hpMax;
    }

    /**
     * Enemies auto-attack process
     */
        autoFighting() {
        var self = this;
        this.timer['fighting'] = this.game.$timeout(function () {

            var hits = self.hits;
            var alive = self.game.characters.get_attacked(hits);

            if (alive) {
                self.autoFighting();
            } else {
                self.game.battle.end(false);
            }
        }, 1000);
    }

    /**
     * Stop fighting
     */
        stopFighting() {
        var success = this.game.$timeout.cancel(this.timer['fighting']);
    }

    /**
     * Enemies are under attack
     * @param  {int} hits
     */
        get_attacked(hits) {
        this.hp -= hits;
        if (this.hp <= 0) {
            this.hp = 0;

            return false;
        }
        return true;
    }

    /**
     * Returns in pixels enemy bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        hpProgress(pixels_max) {
        return this.hp / this.hpMax * pixels_max;
    }

    /**
     * Remove all the enemy
     */
        remove() {
        this.list = [];
        this.refresh();
    }

}


