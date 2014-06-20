class Zone1 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 1;

        this.name = 'Sector 1 Reactor';

        this.enemies = [
            new FirstRay(game),
            new MP(game),
            new Grunt(game),
            new Sweeper(game)
        ];

        this.boss = [
            new GuardScorpion(game)
        ];
    }

}