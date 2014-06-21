class Restore extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Restore'.toUpperCase();

        this.color = 'green';

        this.mpCost = this.level;

        this.price = 750;

        this.apFormula = function (x) {
            return Math.pow(x + 1, 2) + 100;
        };

        this.available = function (x) {
            return x >= 1;
        };

    }

    /**
     * Do materia action
     * Add to HP : +2% to +22%
     */
        action() {
        var that = this;
        var characters_hp = that.game.characters.hpMax;
        var hp = Math.ceil(2 + (2 * that.level / 10) * characters_hp / 100);

        super.action(function () {
            that.game.characters.addHp(hp);
        });
    }

;

}