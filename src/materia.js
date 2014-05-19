/**
 * Materia class
 * @param {Game} Game
 * @param {Object} data
 */

class Materia {

    constructor(Game, data) {

        this._id = _.uniqueId();

        this.Game = Game;

        if (data) {
            this.extend(data);
        }

        if (!_.has(this, 'level')) {
            this.level = 1;
        }
        if (!_.has(this, 'ap')) {
            this.ap = 0;
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
     * Returns description of the materia
     */
        getDesc() {
        var Txt = '';

        switch (this.ref) {
            case 'restore':
                Txt = 'HP +' + (this.level * 2) + '% while restoring';
                break;
            case 'bolt':
                Txt = 'Bolt damages +' + (this.level * 10) + '%';
                break;
            case 'ice':
                Txt = 'Ice damages +' + (this.level * 10) + '%';
                break;
            case 'fire':
                Txt = 'Fire damages +' + (this.level * 10) + '%';
                break;
            case 'poison':
                Txt = 'Poison damages +' + (this.level * 10) + '%';
                break;
            case 'earth':
                Txt = 'Earth damages +' + (this.level * 10) + '%';
                break;
        }

        return Txt;
    }

    /**
     * Return the level of the materia
     * @return {int|String}
     */
        getLevel() {
        if (this.level < this.levelMax) {
            return this.level;
        } else {
            return "MAX";
        }
    }

    /**
     * Get the total ap to level up
     * @return {int}
     */
        getApMax() {
        return eval(this.ap_formula.replace('x', this.level));
    }

    /**
     * Returns the price of the weapon
     * @return {int}
     */
        getPrice() {
        return this.gils;
    }

    /**
     * Returns true if the weapon is owned in the inventory
     * @return {boolean}
     */
        inStock() {
        var materias = _.where(this.Game.materias, {
            ref: this.ref
        });
        return materias.length;
    }

    /**
     * Returns in pixels AP bar width
     * @param  {int} pixels_max
     * @return {int}
     */
        apProgress(pixels_max) {
        return (this.ap == 0 ? 0 : this.ap / this.getApMax() * pixels_max);
    }

    /**
     * Add ap to the materia
     * @param {int} ap
     */
        setAp(ap) {
        this.ap += ap;
        while (this.ap >= this.getApMax() && this.level < this.levelMax) {
            this.ap -= this.getApMax();
            this.level += 1;
        }
    }

    /**
     * Equip a materia
     * @param  {String} characterRef
     */
        equip(characterRef) {
        this.character = characterRef;
        this.Game.characters.refresh();
    }

    /**
     * Unequip a materia
     */
        unequip() {
        this.character = "";
        this.Game.characters.refresh();
    }

    /**
     * Save materia data
     */
        save() {
        return _.pick(this, 'ref', 'character', 'ap', 'level');
    }

}