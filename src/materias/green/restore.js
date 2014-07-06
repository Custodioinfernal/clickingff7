class Restore extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Restore';

        this.color = 'green';

        this.price = 750;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 100;
        };

        this.available = function (x) {
            return x >= 1;
        };

    }

    /**
     * MP cost
     * @returns {number}
     */
        getMpCost() {
        return Math.ceil(this.level / 6);
    }

    /**
     * Return materia power (20% to 40%)
     * @returns {number}
     */
        getPwr() {
        var pwr = 20 * this.level;
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