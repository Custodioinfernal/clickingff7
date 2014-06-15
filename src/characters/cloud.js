class Cloud extends Character {

    constructor(game) {
        super(game);

        // name of the character
        this.name = 'Cloud Strife';

        // character image
        this.image = '/img/characters/cloud.png';

        // character weapon type
        this.weaponType = 'broadsword';

        // character HP base
        this.hpBase = 14;

        // Character XP formula
        this.xpFormula = function (x) {
            return Math.pow(x, 2) * 15;
        };

        // Character zones available
        this.available = function(x) {
              return (1 <= x && x <= 7);
        };

    }

}