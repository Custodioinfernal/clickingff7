class Bolt extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Bolt';

        this.color = 'green';

        this.mpCost = this.level;

        this.price = 600;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 150;
        };

        this.available = function (x) {
            return x >= 1;
        };

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
     * Add to HP : +2% to +22%
     */
        action() {
        var that = this;
        var hits = this.game.characters.getHits() * this.level;
        hits = Math.ceil(hits);

        super.action(function () {
            that.game.enemies.getAttacked(hits);
        });
    }

    /**
     * Translate desc helper
     * @returns {string}
     */
    translate() {
        return "{p:materia.level}";
    }

}