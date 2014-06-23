class Zone2 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 2;

        this.name = 'Sector 5 Reactor';

        this.enemies = [
            "FirstRay",
            "MP",
            "Grunt",
            "Sweeper"
        ];

        this.boss = [
            "GuardScorpion"
        ];
    }

}