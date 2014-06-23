/**
 * Shop class
 * @param {Game} Game
 */

class Shop {

    constructor(Game) {

        this._id = _.uniqueId();

        this.Game = Game;
    }

    /**
     * Build contents
     */
        build() {
        // Weapons
        this.weapons = [];
        for (var i in this.Game.data.weapons) {
            var data = this.Game.data.weapons[i];
            this.weapons.push(new Weapon(this.Game, data));
        }

        // Materias
        this.materias = [];
        for (var i in this.Game.data.materias) {
            var data = this.Game.data.materias[i];
            this.materias.push(new Materia(this.Game, data));
        }

        // Items
        this.items = [];
        for (var i in this.Game.data.items) {
            var data = this.Game.data.items[i];
            this.items.push(new Item(this.Game, data));
        }
    }

    /**
     * Get weapons available in shop
     */
        getWeapons() {
        var zoneLvlMax = this.Game.zones.levelMax;

        return _.filter(this.weapons, function (o) {
            return (o.zone <= zoneLvlMax);
        });

    }

    /**
     * Get materias available in shop
     */
        getMaterias() {
        var zoneLvlMax = this.Game.zones.levelMax;

        return _.filter(this.materias, function (o) {
            return (o.zone <= zoneLvlMax);
        });

    }

    /**
     * Get items available in shop
     */
        getItems() {
        var zoneLvlMax = this.Game.zones.levelMax;

        return _.filter(this.items, function (o) {
            return (o.zone <= zoneLvlMax);
        });

    }

    /**
     * Returns true is player can buy the item
     * @param  {Weapon|Materia|Item} item
     * @return {Boolean}
     */
        canBuy(item) {
        return (this.Game.gils >= item.getPrice());
    }

}