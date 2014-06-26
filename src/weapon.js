/**
 *
 */

class Weapon {

    constructor(game) {
        this.game = game;
    }

    /**
     * Extends
     * @param data
     * @returns {Weapon}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /*
     * Returns the price of the weapon
     * @return {int}
     */
    getPrice() {
        return this.price;
    }

    /**
     * Returns true if the weapon can be bought
     * @returns {boolean}
     */
    canBuy() {
        return (this.game.gils >= this.getPrice());
    }

    /**
     * Buy the weapon
     */
    buy() {
        if (this.canBuy()) {
            this.game.gils -= this.getPrice();
            this.game.weapons.add(this, false);
        }
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
        // find current equipped weapon
        var weapon = _.findWhere(this.game.weapons.list, {
            type: this.type,
            equipped : true
        });

        weapon.equipped = false;

        // then equipped this one
        this.equipped = true;

        this.game.characters.refresh();
    }

    /*
     * Save weapon
     */
    export() {
        var json = _.pick(this, 'equipped');
        json.model = this.constructor.name;
        return json;
    }

}