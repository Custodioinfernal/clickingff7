class Zone1 extends Zone {

    /**
     *
     * @param game
     */
        constructor(game) {
        super(game);

        this.image = "/img/zones/Sector_1_Reactor.png";

        this.enemies = [
            "FirstRay",
            "MP",
            "Grunt",
            "Sweeper"
        ];
    }

}