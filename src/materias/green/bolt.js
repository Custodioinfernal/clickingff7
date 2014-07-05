class Bolt extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Bolt';

        this.color = 'green';

        this.price = 600;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 150;
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
        return this.level;
    }

    /**
     * Return materia power (7% to 27%)
     * @returns {number}
     */
        getPwr() {
        var pwr = 7 + (this.level / 100 * 20);
        return Math.ceil(pwr);
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.battle.isBattle && this.game.characters.mp >= this.getMpCost());
    }

    /**
     * Do materia action
     */
        action() {
        var that = this;
        var attack = new Attack(this.getPwr(), ['bolt']);

        super.action(function () {
            that.game.enemies.getAttacked(attack);
        });
    }

}