class HiPotion extends Item {

    constructor(game) {
        super(game);

        this.name = 'Hi-Potion';

        this.price = 1500;

        this.available = function(x) {
            return x >= 7;
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
            that.game.characters.addHp(850);
        });
    }

}