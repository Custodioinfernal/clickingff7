/**
 * Characters class
 * @param {object} Game
 */

class Enemies {

    constructor(Game) {

        this._id = _.uniqueId();

        this.Game = Game;

        this.enemies = [];

        this.timer = {};
    }

    /**
     * Returns all enemies fighting
     * @return {[type]} [description]
     */
        getTeam() {
        return this.enemies;
    }

    /**
     * Add a weakness
     */
        addWeakness(effect) {
        if (!_.has(this.weakness, effect)) {
            this.weakness[effect] = 0;
        }
        this.weakness[effect] += 10;
    }

    /**
     * Add a resistance
     */
        addResists(effect) {
        if (!_.has(this.resists, effect)) {
            this.resists[effect] = 0;
        }
        this.resists[effect] += 10;
    }

    /**
     * Pick a random number of enemies of the current zone
     * @return {[type]} [description]
     */
        random() {
        var zoneLvl = this.Game.zones.level;
        var chances = [];
        var last = 0;
        var data = this.Game.data.enemies[zoneLvl];
        var Level = Math.max(this.Game.characters.levelMax, data[1].level);
        var Level = Math.min(Level, data[5].level);
        var enemies = _.filter(data, function (o) {
            return (Math.max(Level - 1, 1) <= o.level + 2 && o.level <= Level);
        });
        for (var i in enemies) {
            var enemy = enemies[i];
            var chance = Math.ceil(Math.pow(enemies.length - Math.abs(enemy.level - Level), 2) + last);
            chances.push(chance);
            last = chance;
        }
        var sX = _.random(1, _.last(chances));
        i = 0;
        while (sX > chances[i]) {
            i++;
        }
        var data = enemies[i];
        this.enemies.push(new Enemy(this, data));
    }

    /**
     * Refresh all the enemy
     */
        refresh() {
        this.hpMax = 0;
        this.hits = 0;
        this.weakness = {};
        this.resists = {};

        var enemies = this.getTeam();
        for (var i in enemies) {
            // HP
            this.hpMax += enemies[i].getHpMax();
            this.hits += enemies[i].getHits();

            var weakness = enemies[i].weakness;
            if (weakness) {
                for (var j in weakness) {
                    this.addWeakness(weakness[j]);
                }
            }

            var resists = enemies[i].resists;
            if (resists) {
                for (var j in resists) {
                    this.addResists(resists[j]);
                }
            }
        }

        this.hp = this.hpMax;
    }

    /**
     * Enemies auto-attack process
     */
        autoFighting() {
        var self = this;
        this.timer['fighting'] = this.Game.$timeout(function () {

            var hits = self.hits;
            var alive = self.Game.characters.get_attacked(hits);

            if (alive) {
                self.autoFighting();
            } else {
                self.Game.end_fight(false);
            }
        }, 1000);
    }

    /**
     * Stop fighting
     */
        stopFighting() {
        var success = this.Game.$timeout.cancel(this.timer['fighting']);
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
        this.enemies = [];
        this.refresh();
    }

}


