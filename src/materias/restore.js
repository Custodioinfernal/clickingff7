class Restore extends Materia {

    constructor(game) {
        super(game);

        this.name = 'Restore';

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
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.mp >= this.mpCost
            && this.game.characters.hp < this.game.characters.hpMax);
    }

    /**
     * Do materia action
     * Add to HP : +30% to +60%
     */
        action() {
        var that = this;
        var begin = 30;
        var end = 60;
        var characters_hp = that.game.characters.hpMax;
        var hp = Math.ceil(begin + ((end - begin) * that.level / 100) * characters_hp / 100);

        super.action(function () {
            that.game.characters.addHp(hp);
        });
    }

;

}