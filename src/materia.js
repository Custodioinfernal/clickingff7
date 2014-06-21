class Materia {

    constructor(game) {
        this.game = game;
        this.level = 1;
        this.ap = 0;
    }

    /**
     * Extends
     * @param data
     * @returns {Materia}
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
            this.game.characters.mp -= this.mpCost;
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

    /*
     * @returns {Object}
     */
    getApMax() {
        return this.apFormula(this.level + 1);
    }

    /*
     * @returns {game.gils|*|number|save.gils}
     */
    getPrice() {
        return this.gils;
    }

    /*
     * @param pixels_max
     * @returns {number}
     */
    apProgress(pixels_max) {
        return (this.ap == 0 ? 0 : this.ap / this.getApMax() * pixels_max);
    }

    /*
     * @param ap
     */
    setAp(ap) {
        this.ap += ap;
        while (this.ap >= this.getApMax() && this.level < this.levelMax) {
            this.ap -= this.getApMax();
            this.level += 1;
        }
    }

    /**
     * Returns true if the materia can be equipped
     * @returns {boolean}
     */
        canEquip() {
        return (this.game.materias.getEquipped().length < this.game.weapons.maxMaterias());
    }

    /**
     * Equip the materia
     */
        equip() {
        this.equipped = true;
        this.game.characters.refresh();
    }

    /**
     * Unequip the materia
     */
        unequip() {
        this.equipped = false;
        this.game.characters.refresh();
    }

    /**
     * Exports
     * @returns {Object}
     */
        export() {
        var json = _.pick(this, 'ap', 'level', 'equipped');
        json.model = this.constructor.name;
        return json;
    }

}