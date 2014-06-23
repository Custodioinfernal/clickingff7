/**
 * Item class
 * @param {Game} Game
 * @param {string} ref
 */

class Item {

    constructor(game) {
        this.game = game;
    }

    /**
     * Extends
     * @param data
     * @returns {Item}
     */
        load(data) {
        for (var i in data) {
            this[i] = data[i];
        }
        return this;
    }

    /**
     * Executes materia action
     * @param fn
     */
        action(fn) {
        // cost
        if (this.canUse()) {
            _.remove(this.game.items.list, this);
        } else {
            throw "CANNOT USE";
        }

        // do action
        if (this.game.battle.isBattle) {
            this.game.characters.stopFighting();
            fn();
            this.game.characters.autoFighting();
        } else {
            fn();
        }
    }

    /**
     * Save materia data
     */
        export() {
        var json = {};
        json.model = this.constructor.name;
        return json;
    }

}