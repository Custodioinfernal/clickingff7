class Fire extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Fire';

        this.color = 'green';

        this.price = 600;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 150;
        };

        this.available = function (x) {
            return x >= 2;
        };

    }

    /**
     * MP cost
     * @returns {number}
     */
        getMpCost() {
        return Math.ceil(this.getPwr() / 10);
    }

    /**
     * Return materia power
     * @returns {number}
     */
        getPwr() {
        return Math.ceil(this.level * (20 + (this.level/100) * 60) / 5);
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
        var attack = new Attack(this.getPwr(), ['fire']);

        super.action(function () {
            that.game.enemies.getAttacked(attack);
        });
    }

}