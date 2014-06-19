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
            new FirstRay(game)
        ];
    }

}