/**
 * Item class
 * @param {Game} Game
 * @param {string} ref
 */

class Item {

    constructor(Game, data) {

        this._id = _.uniqueId();

        this.Game = Game;

        if (data) {
            this.extend(data);
        }
        if (!('type' in this)) {
            this.type = 'items';
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
     * Use an item
     */
        use() {
        switch (this.ref) {
            case 'potion':
                this.Game.characters.addHp(this.getBonus());
                break;
            case 'hi-potion':
                this.Game.characters.addHp(this.getBonus());
                break;
        }
        for (var i in this.Game.items) {
            if (_.isEqual(this.Game.items[i], this)) {
                this.Game.items.splice(i, 1);
            }
        }
    }

    /**
     * Return description of the materia
     */
        getDesc() {
        var Txt = '';

        switch (this.ref) {
            case 'potion':
                Txt = 'HP +' + this.getBonus();
                break;
            case 'hi-potion':
                Txt = 'HP +' + this.getBonus();
                break;
        }

        return Txt;
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
        var items = _.where(this.Game.items, {
            ref: this.ref
        });
        return items.length;
    }

    /**
     * Return the total bonus of the item
     * @return {int}
     */
        getBonus() {
        return this.bonus;
    }

    /**
     * Save materia data
     */
        save() {
        return _.pick(this, 'ref');
    }

}