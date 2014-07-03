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
     * Get cured HP
     * @returns {number}
     */
    getCure(){
        var begin = 30;
        var end = 60;
        var characters_hp = this.game.characters.hpMax;
        return Math.ceil(begin + ((end - begin) * this.level / 100) * characters_hp / 100);
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
        var hp = this.getCure();

        super.action(function () {
            that.game.characters.addHp(hp);
        });
    }

    /**
     * Translate desc helper
     * @returns {string}
     */
        translate() {
        return "{p:materia.getCure()}";
    }

}