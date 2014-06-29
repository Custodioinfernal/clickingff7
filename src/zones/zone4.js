class Zone4 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 4;

        this.name = 'Sector 7';

        this.description = "With the help of Aerith, Cloud found his friends, fighting the SHINRA who wants to bomb the sector 7. Aerith left to warn the residents.";

        this.image = "/img/zones/Sector_7.png";

        this.enemies = [
            "AeroCombatant",
            "Deenglow",
            "Eligor",
            "GuardHound"
        ];

        this.boss = [
            "Reno"
        ];
    }

}