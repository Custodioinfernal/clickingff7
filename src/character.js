/**
 * Character class
 * @param {object} Game
 * @param {string} ref
 */

class Character {

    constructor(Characters, data) {

        this._id = _.uniqueId();

        this.Characters = Characters;

        if (data) {
            this.extend(data);
        }
        if (!('level' in this)) {
            this.level = 1;
        }
        if (!('xp' in this)) {
            this.xp = 0;
        }
    }

    /**
     * Extends the data properties with saved data
     * @param  {object} data
     */
        extend(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }

    /**
     * Get the weapon of the character
     * @return {Weapon|undefined}
     */
        weapon() {
        return _.findWhere(this.Characters.Game.weapons, {
            "character": this.ref,
            "equipped": true
        });
    }

    /**
     * Get the materia of the character
     * @return {Materia|undefined}
     */
        materia() {
        return _.findWhere(this.Characters.Game.materias, {
            "character": this.ref
        });
    }

    /**
     * returns character total HP
     * based on level and weapon level
     * @return {int}
     */
        getHpMax() {
        return this.hpBase * this.level;
    }

    /**
     * returns character total hits
     * based on level and weapon level
     * @return {int}
     */
        getHits() {
        return this.level * this.weapon().hits * 0.1;
    }

    /**
     * Get the total xp to level up
     * @return {int}
     */
        getXpMax() {
        return eval(this.xp_formula.replace('x', this.level + 1));
    }

    /**
     * Returns in pixels XP bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        xpProgress(pixels_max) {
        return (this.xp == 0 ? 0 : this.xp / this.getXpMax() * pixels_max);
    }

    /**
     * Add xp to the character
     * @param {int} xp
     */
        setXp(xp) {
        this.xp += xp;
        while (this.xp >= this.getXpMax()) {
            this.xp -= this.getXpMax();
            this.level += 1;

            this.Characters.refresh();
        }
    }

    /**
     * Returns current line
     * @return {string}
     */
        getLine() {
        var zoneLvlMax = this.Characters.Game.zones.levelMax;
        return this.Characters.Game.data.lines[zoneLvlMax][this.ref];
    }

    /**
     * Save character data
     */
        save() {
        var json = _.pick(this, 'ref', 'level', 'xp');

        return json;
    }
}
