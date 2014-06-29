class Cloud extends Character {

    constructor(game, data) {
        super(game, data);

        // name of the character
        this.name = 'Cloud Strife';

        // character image
        this.image = '/img/characters/cloud.jpg';

        // character weapon type
        this.weaponType = 'broadsword';

        // STATS
        this.hpBase = 3;
        this.mpBase = 3;

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