class Ether extends Item {

    constructor(game) {
        super(game);

        this.name = 'Ether'.toUpperCase();

        this.price = 200;

        this.available = function(x) {
            return true;
        };
    }

    /**
     * Can use the materia?
     * @returns {boolean}
     */
        canUse() {
        return (this.game.characters.mp < this.game.characters.mpMax);
    }

    /**
     * Use potion
     */
        action() {
        var that = this;

        super.action(function () {
            that.game.characters.addHp(20);
        });
    }

}