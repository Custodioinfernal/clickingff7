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
        return Math.ceil(this.getPwr() / 100);
    }

    /**
     * Return materia power
     * @returns {number}
     */
        getPwr() {
        return Math.ceil(this.level * (20 + (this.level/100) * 60));
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