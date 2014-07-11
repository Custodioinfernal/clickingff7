class ChocoMog extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Choco/Mog';

        this.color = 'red';

        this.price = 3000;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 3) + 150;
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
        return Math.ceil(this.getPwr() / 10);
    }

    /**
     * Return materia power
     * @returns {number}
     */
        getPwr() {
        return Math.ceil(this.level * (10 + (this.level/100) * 20));
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
        var attack = new Attack(this.getPwr());

        super.action(function () {
            that.game.enemies.getAttacked(attack);
        });
    }

}