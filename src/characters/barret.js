class Barret extends Character {

    constructor(game) {
        super(game);

        // name of the character
        this.name = 'Barret Wallace';

        // character image
        this.image = '/img/characters/barret.png';

        // character weapon type
        this.weaponType = 'gun-arm';

        // STATS
        this.hpBase = 5;
        this.mpBase = 1;

        // Character XP formula
        this.xpFormula = function (x) {
            return Math.pow(x, 2) * 13;
        };

        // Character zones available
        this.available = function(x) {
              return x != 3;
        };

    }

}