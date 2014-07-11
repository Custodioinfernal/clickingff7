class Earth extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Earth';

        this.color = 'green';

        this.price = 1500;

        // STATS
        this.apBase = 3;

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