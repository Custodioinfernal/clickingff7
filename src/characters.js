/**
 * Characters class
 * @param {object} Game
 */

class Characters {

    constructor(game) {

        // game object
        this.game = game;

        // maximum characters in the team
        this.MAX_TEAM = 3;

        // active characters
        this.team = [];

        // backup characters
        this.backup = [];

        // timers array
        this.timer = {};
    }

    /*
     * @param hp
     */
    addHp(hp) {
        this.hp += hp;
        if (this.hp > this.hpMax) {
            this.hp = this.hpMax;
        }
    }

    /**
     * Add a character
     * @param c
     */
        add(c) {
        if (this.team.length < this.MAX_TEAM) {
            this.team.push(c);
        } else {
            this.backup.push(c);
        }
    }

    /*
     * Refresh characters stats
     */
    refresh() {
        this.hpMax = 0;
        this.limitMax = 0;
        this.hits = 0;
        this.levelMax = 0;

        var characters = this.team;
        for (var i in characters) {
            // Level
            if (characters[i].level > this.levelMax) {
                this.levelMax = characters[i].level;
            }

            // HP, hits
            this.hpMax += characters[i].getHpMax();
            this.hits += characters[i].getHits();
        }

        this.limitMax = this.hpMax * 2;

        if (!_.has(this, 'hp')) {
            this.hp = this.hpMax;
        }
        if (!_.has(this, 'limit')) {
            this.limit = 0;
        }
    }

    /**
     * Get total characters hits
     */
        getHits() {
        return this.hits;
    }

    /**
     * Characters auto-attack process
     */
        autoFighting() {
        var self = this;
        this.timer['fighting'] = this.game.$timeout(function () {

            var hits = self.getHits();
            var alive = self.game.enemies.get_attacked(hits);

            if (alive) {
                self.autoFighting();
            } else {
                self.game.battle.end(true);
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
     * Returns in pixels characters hp bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        hpProgress(pixels_max) {
        return this.hp / this.hpMax * pixels_max;
    }

    /**
     * Returns in pixels characters hp bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        limitProgress(pixels_max) {
        return this.limit / this.limitMax * pixels_max;
    }

    /**
     * Enemies are under attack
     * @param  {int} hits
     */
        get_attacked(hits) {
        this.hp -= hits;

        this.limit += hits;
        if (this.limit > this.limitMax) {
            this.limit = this.limitMax;
        }

        if (this.hp <= 0) {
            this.limit = 0;
            this.hp = 0;

            return false;
        }

        return true;
    }

    /**
     * Escape from fight
     */
        escape() {
        this.game.battle.end(false);
    }

    /**
     * Returns if it is possible to attack
     * @return {boolean}
     */
        canAttack() {
        return (this.game.mode == "fight");
    }

    /**
     * Returns if it is possible to execute a limit (powerful attack)
     * @return {boolean}
     */
        canLimit() {
        return (this.game.mode == "fight" && this.limit == this.limitMax);
    }

    /**
     * Returns if it is possible to cure characters hp
     * @return {boolean}
     */
        canRestore() {
        return (this.hp < this.hpMax);
    }

    /**
     * Returns if it is possible to escape from enemy
     * @return {boolean}
     */
        canEscape() {
        return (this.game.mode == "fight");
    }

    /**
     * Returns data for export
     * @return {Object}
     */
        export() {
        var res = {
            "hp"    : this.hp,
            "limit" : this.limit,
            "team"  : [],
            "backup": []
        };

        for (var i in this.team) {
            res.team[i] = this.team[i].export();
        }

        for (var i in this.backup) {
            res.backup[i] = this.backup[i].export();
        }

        return res;
    }

}