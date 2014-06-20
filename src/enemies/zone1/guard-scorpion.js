class GuardScorpion extends Enemy {

    constructor(game) {
        super(game);

        this.name = 'Guard Scorpion';

        this.image = '/img/enemies/zone1/guard-scorpion.png';

        this.boss = true;

        // BELOW – rate over 5
        this.hpMax = 5;
        this.hits = 5;
        this.xp = 5;
        this.ap = 5;
        this.gils = 5;
        // END
    }

}