/**
 *
 */

class Weapon {

    constructor(game) {
        this.game = game;
    }

    /*
     * Extends the data properties with saved data
     * @param  {object} data
     */
    extend(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }

    /*
     * Returns the price of the weapon
     * @return {int}
     */
    getPrice() {
        return this.gils;
    }

    /*
     * Returns true if the weapon is owned in the inventory
     * @return {boolean}
     */
    inStock() {
        var weapons = _.where(this.game.weapons, {
            ref: this.ref
        });
        return weapons.length;
    }

    /*
     * Equip a weapon
     */
    equip() {
        var weapon = _.findWhere(this.game.weapons, {
            character: this.character,
            equipped : true
        });

        weapon.equipped = false;

        this.equipped = true;

        this.game.characters.refresh();
    }

    /*
     * Save weapon
     */
    save() {
        return _.pick(this, 'ref', 'equipped');
    }

}