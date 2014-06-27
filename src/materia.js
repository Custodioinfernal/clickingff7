class Materia {

    constructor(game) {
        this.game = game;

        // current level
        this.level = 1;

        // needed to upgrade
        this.ap = 0;

        // nbr equipped
        this.equipped = 0;
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

    /**
     * Returns the price of the materia
     * @return {int}
     */
        getPrice() {
        return this.price;
    }

    /**
     * Returns true if the materia can be bought
     * @returns {boolean}
     */
        canBuy() {
        return (this.game.gils >= this.getPrice());
    }

    /**
     * Buy the materia
     */
        buy() {
        if (this.canBuy()) {
            this.game.gils -= this.getPrice();
            this.game.materias.add(this, false);
        }
    }

    /**
     * Returns the number of owned
     * @returns {Number}
     */
        inStock() {
        return _.where(this.game.materias.list, {name: this.name}).length;
    }

    /*
     * @returns {Object}
     */
    getApMax() {
        return this.apFormula(this.level + 1);
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
        while (this.ap >= this.getApMax()) {
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