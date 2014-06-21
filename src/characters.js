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

        // list of characters
        this.list = [];

        // Array of recent hits
        this.arrHits = [];

        // timers array
        this.timer = {};
    }

    /**
     * @param hp
     */
        addHp(hp) {
        this.hp += hp;
        if (this.hp > this.hpMax) {
            this.hp = this.hpMax;
        }
    }

    /**
     * @param mp
     */
        addMp(mp) {
        this.mp += mp;
        if (this.mp > this.mpMax) {
            this.mp = this.mpMax;
        }
    }

    /**
     * Add a character
     * @param character
     * @param inTeam
     */
        add(character, inTeam) {
        character.inTeam = (this.list.length < this.MAX_TEAM) ? inTeam : false;
        this.list.push(character);
    }

    /**
     * Returns the in-team characters
     * @returns {Array}
     */
        getTeam() {
        return _.where(this.list, {inTeam: true});
    }

    /*
     * Refresh characters stats
     */
    refresh() {
        this.hpMax = 0;
        this.mpMax = 0;
        this.limitMax = 0;
        this.hits = 0;
        this.arrHits = [];
        this.levelMax = 0;
        this.levelSum = 0;

        var characters = this.getTeam();
        for (var i in characters) {
            // Level
            if (characters[i].level > this.levelMax) {
                this.levelMax = characters[i].level;
            }

            // HP, hits
            this.hpMax += characters[i].getHpMax();
            this.mpMax += characters[i].getMpMax();
            this.hits += characters[i].getHits();
            this.levelSum += characters[i].level;
        }

        this.limitMax = this.hpMax * 2;

        if (!_.has(this, 'hp')) {
            this.hp = this.hpMax;
        }
        if (!_.has(this, 'mp')) {
            this.mp = this.mpMax;
        }
        if (!_.has(this, 'limit')) {
            this.limit = 0;
        }
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
     * Get total characters hits
     * @param hits
     */
        displayHits(hits) {
        var self = this;
        this.arrHits.unshift(hits);
        if (this.arrHits.length > 5) {
            this.arrHits.pop();
        }
    }

    /**
     * Characters auto-attack process
     */
        autoFighting() {
        var self = this;
        this.timer['fighting'] = this.game.$timeout(function () {

            var hits = self.getHits();
            var alive = self.game.enemies.getAutoAttacked(hits);

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
     * Returns in pixels characters mp bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        mpProgress(pixels_max) {
        return this.mp / this.mpMax * pixels_max;
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
        getAutoAttacked(hits) {
        this.hp -= hits;
        this.game.enemies.displayAutoHits(hits);

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
        return (this.game.battle.isBattle);
    }

    /**
     * Returns if it is possible to execute a limit (powerful attack)
     * @return {boolean}
     */
        canLimit() {
        return (this.game.battle.isBattle && this.limit == this.limitMax);
    }

    /**
     * Returns if it is possible to escape from enemy
     * @return {boolean}
     */
        canEscape() {
        return (this.game.battle.isBattle);
    }

    /**
     * Returns data for export
     * @return {Object}
     */
        export() {
        var res = {
            "hp"   : this.hp,
            "mp"   : this.mp,
            "limit": this.limit,
            "list" : []
        };

        for (var i in this.list) {
            res.list[i] = this.list[i].export();
        }

        return res;
    }

}