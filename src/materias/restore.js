class Restore extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Restore'.toUpperCase();

        this.color = 'green';

        this.mpCost = this.level;

        this.price = 750;

        this.xpFormula = function (x) {
            return Math.pow(x + 1, 4) * 25;
        };

        this.available = function (x) {
            return x >= 1;
        };

    }

    action() {
        var that = this;
        super.action(function () {
            that.game.characters.addHp(that.level * 2);
        });
    }

;

}