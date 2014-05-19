/**
 * Weapon class
 * @param {Game} Game
 * @param {string} ref
 */

class Weapon {

    constructor(Game, data) {

        this._id = _.uniqueId();

        this.Game = Game;

        if (data) {
            this.extend(data);
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
        var weapons = _.where(this.Game.weapons, {
            ref: this.ref
        });
        return weapons.length;
    }

    /**
     * Equip a weapon
     */
        equip() {
        var weapon = _.findWhere(this.Game.weapons, {
            character: this.character,
            equipped: true
        });

        weapon.equipped = false;

        this.equipped = true;

        this.Game.characters.refresh();
    }

    /**
     * Save weapon
     */
        save() {
        return _.pick(this, 'ref', 'equipped');
    }

}