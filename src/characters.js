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

        // stand-by characters
        this.stack = [];

        // timers array
        this.timer = {};

        // background skills
        //this.autoRestore();
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
     * Add an effect
     * @param {String} effect
     * @param {int} level
     */
        addEffect(effect, level) {
        if (!_.has(this.effects, effect)) {
            this.effects[effect] = 0;
        }
        this.effects[effect] += level;
    }

    /*
     * @param character
     */
    addTeam(character) {
        if (this.team.length < this.MAX_TEAM) {
            this.team.push(character);
        } else {
            this.addStack(character);
        }
    }

    /*
     * @param character
     */
    addStack(character) {
        this.stack.push(character);
    }

    /*
     *
     */
    refresh() {
        this.hpMax = 0;
        this.limitMax = 0;
        this.hits = 0;
        this.effects = {};
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
        var hits = 0;
        hits += this.hits;
        hits += ((this.weaknessDamages - this.resistsDamages) * 10 / 100) * hits;
        return hits;
    }

;

    /**
     * Characters do train
     */
        train() {
        if (this.game.mode == "normal") {
            this.game.mode = "train";
            this.autoTrain();
        }
    }

    /**
     * Auto-train (XP by level zone)
     */
        autoTrain() {
        var self = this;
        this.timer['train'] = this.game.$timeout(function () {

            var xp = Math.pow(self.game.zones.level, 2);
            var characters = self.getTeam();
            for (var i in characters) {
                characters[i].setXp(xp);
            }

            self.autoTrain();
        }, 1000);
    }

    /**
     * Characters stop training
     */
        stopTrain() {
        this.game.mode = "normal";
        this.game.$timeout.cancel(this.timer['train']);
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
                self.game.end_fight(true);
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
     * Auto-restore HP while not in fight
     */
        autoRestore() {
        var self = this;
        this.timer['restore'] = this.game.$timeout(function () {

            if (self.game.mode == "normal") {
                self.restore();
            }

            self.autoRestore();
        }, 1000);
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
     * Characters do explore
     */
        explore() {
        this.game.enemies.random();
        this.game.enemies.refresh();
        this.refresh();
        this.game.start_fight();
    }

    /**
     * Do a manual cure - based on materia
     * @return {[type]} [description]
     */
        restore() {
        var characters = this.getTeam();

        var Lvl = 1;
        for (var i in characters) {
            var character = characters[i];
            if (character.materia() && character.materia().ref == 'restore') {
                Lvl += character.materia().level;
            }
        }

        var resHp = Math.ceil(this.hpMax * (Lvl * 1 / 100));

        this.addHp(resHp);

        return resHp;
    }

    /**
     * Escape from fight
     */
        escape() {
        this.game.end_fight(false);
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
        save() {
        var res = {
            "hp"   : this.hp,
            "limit": this.limit,
            "data" : []
        };

        for (var i in this.characters) {
            res.data[i] = this.characters[i].save();
        }

        return res;
    }

}