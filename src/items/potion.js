class Potion extends Item {

    constructor(game) {
        super(game);

        this.name = 'Potion';

        this.price = 150;

        this.available = function(x) {
            return true;
        };
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.hp < this.game.characters.hpMax);
    }

    /**
     * Use potion
     */
        action() {
        var that = this;

        super.action(function () {
            that.game.characters.addHp(150);
        });
    }

}