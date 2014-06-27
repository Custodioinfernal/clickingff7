/**
 *
 */

class Weapon {

    constructor(game) {
        this.game = game;

        // nbr owned
        this.number = 1;

        // equipped
        this.equipped = false;
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

    /**
     * Returns the number of owned
     * @returns {*}
     */
        inStock() {
        var sum = 0;
        for ( var w of this.game.weapons.list) {
            if (w.name === this.name) {
                sum += w.number;
            }
        }
        return sum;
    }

    /*
     * Equip a weapon
     */
    equip() {
        // find current equipped weapon
        var weapon = _.findWhere(this.game.weapons.list, {
            type    : this.type,
            equipped: true
        });

        if (weapon) {
            weapon.equipped = false;
        }

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