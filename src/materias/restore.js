class Restore extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Restore';

        this.color = 'green';

        this.price = 750;

        this.xpFormula = function (x) {
            return Math.pow(x + 1, 4) * 25;
        };

        this.available = function (x) {
            return x >= 1;
        };

    }

    action() {
        this.game.characters.addHp(2);
    };

}