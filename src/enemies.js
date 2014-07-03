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
        this.arrHits = [];
        this.timer = {};
    }

    /**
     * Pick a random enemy of the current zone
     */
        random() {
        var enemy;
        var levelMax = this.game.characters.levelMax;
        var zone = this.game.zones.current();

        if (levelMax >= zone.level * 4 && !zone.completed) {

            enemy = new window[zone.boss](this.game);
            enemy._toLevel(levelMax + 1);
            this.list = [enemy];

        } else {
            var range = levelMax - zone.level;

            var e = zone.enemies[_.random(0, range)];
            enemy = new window[e](this.game);
            enemy._toLevel(levelMax);

            this.list = [enemy];
        }
    }

    /**
     * Refresh all the enemy
     */
        refresh() {
        this.hpMax = 0;
        this.hits = 0;
        this.arrHits = [];

        var enemies = this.list;
        for (var i in enemies) {
            // HP
            this.hpMax += enemies[i].getHpMax();
            this.hits += enemies[i].getHits();
        }

        this.hp = this.hpMax;
    }

    /**
     * Get *random* total characters hits
     */
        getHits() {
        var a = this.hits * (1 - 10 / 100);
        var b = this.hits * (1 + 10 / 100);
        return Math.round(_.random(a, b));
    }

    /**
     * Get total characters auto hits
     * @param hits
     */
        displayAutoHits(hits) {
        var self = this;
        this.arrHits.unshift(hits);
        if (this.arrHits.length > 5) {
            this.arrHits.pop();
        }
        this.game.$rootScope.$apply();
    }

    /**
     * Enemies auto-attack process
     */
        autoFighting() {
        var self = this;
        this.timer['fighting'] = this.game.$timeout(function () {

            var hits = self.getHits();
            var alive = self.game.characters.getAutoAttacked(hits);

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
     * Enemies are under auto attack
     * @param hits
     * @returns {boolean}
     */
        getAutoAttacked(hits) {
        this.hp -= hits;
        this.game.characters.displayAutoHits(hits);

        if (this.hp <= 0) {
            this.hp = 0;

            return false;
        }
        return true;
    }

    /**
     * Enemies are under manual attack
     * @param hits
     * @returns {boolean}
     */
        getAttacked(hits) {
        this.hp -= hits;
        this.game.characters.displayHits(hits);

        if (this.hp <= 0) {
            this.hp = 0;
            this.game.battle.end(true);
        }
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


