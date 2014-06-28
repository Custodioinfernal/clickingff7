class Zone3 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 3;

        this.name = 'Sector 6';

        this.description = "It was a trap! Avalanche has successfully destroyed the reactor. However, Cloud was separated from his friends and woke up in a church, meeting Aerith.";

        this.image = "/img/zones/Sector_6.png";

        this.enemies = [
            "Vice",
            "WholeEater",
            "HedgehogPie",
            "HellHouse"
        ];

        this.boss = [
            "Aps"
        ];
    }

}