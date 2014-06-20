class Zone {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.completed = false;
    }

    /**
     * Extends
     * @param data
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }

    /**
     * Generate enemies
     */
        getEnemies() {
        var enemies = [];
        var levelSum = Math.min(this.game.characters.levelSum, this.game.zones.level * 4 * 3);
        var nbEnemies = _.random(1, Math.min(levelSum, 3));
        var levels = this._cut(levelSum, nbEnemies);
        for (var i = 1; i <= nbEnemies; i++) {
            var enemy = _.sample(this.enemies, 1)[0];
            enemy._toLevel(levels[i - 1]);
            enemies.push(enemy);
        }
        return enemies;
    }

    /**
     * Cut a amount into a sum of numbers
     * @param amount
     * @param nb
     * @private
     */
        _cut(amount, nb) {
        var arr = [];
        for (var i = 1; i < nb; i++) {
            var x = _.random(1, amount - nb + i);
            amount -= x;
            arr.push(x);
        }
        arr.push(amount);
        return arr;
    }

    /**
     * Go to the zone
     */
        go() {
        this.game.zones.level = this.level;
    }

    /**
     * Returns true if player is on this level
     * @return {Boolean}
     */
        here() {
        return (this.level == this.game.zones.level);
    }

    /**
     * Save zone data
     */
        export() {
        var json = _.pick(this, 'completed');
        json.model = this.constructor.name;
        return json;
    }

}

