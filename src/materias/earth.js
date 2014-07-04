class Earth extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Earth';

        this.color = 'green';

        this.price = 1500;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 150;
        };

        this.available = function (x) {
            return x >= 7;
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
        return (this.game.battle.isBattle && this.game.characters.mp >= this.mpCost);
    }

    /**
     * Do materia action
     * Hits : 10% to 30%
     */
        action() {
        var that = this;
        var attack = new Attack(this.getPwr(), ['earth']);

        super.action(function () {
            that.game.enemies.getAttacked(attack);
        });
    }

}