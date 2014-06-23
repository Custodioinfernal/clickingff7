class Zone1 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 1;

        this.name = 'Sector 1 Reactor';

        this.description = "Cloud just joined Avalanche. With Barret, the leader, they planned to destroy a MAKO reator which depletes the energy of the Planet.";

        this.image = "/img/zones/Sector_1_Reactor.png";

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