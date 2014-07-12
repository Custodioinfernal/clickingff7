class CureMateria extends Materia {

    constructor(game) {
        super(game);
    }

    /**
     * MP cost
     * @returns {number}
     */
        getMpCost() {
        return Math.ceil(this.level / 10);
    }

    /**
     * Return materia power
     * @returns {number}
     */
        getPwr() {
        var hpMax = this.game.characters.hpMax;
        var pwr = hpMax * ((this.pwr + this.level / 100 * 20) / 100);
        return Math.ceil(pwr);
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.mp >= this.getMpCost()
            && this.game.characters.hp < this.game.characters.hpMax);
    }

    /**
     * Do materia action
     * Add to HP : +30% to +60%
     */
        action() {
        var that = this;
        var cure = new Cure(this.getPwr());

        super.action(function () {
            that.game.characters.addHp(cure.getCure());
        });
    }

}