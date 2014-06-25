class Zone2 extends Zone {

    /**
     * Init
     * @param game
     */
    constructor(game) {
        super(game);

        this.level = 2;

        this.name = 'Sector 5 Reactor';

        this.description = "After succesfully destroyed one reactor, Avalanche planned to destroy another one. Tifa joined the group to help.";

        this.image = "/img/zones/Sector_5_Reactor.png";

        this.enemies = [
            "BloodTaste",
            "ProtoMachinegun",
            "Smogger",
            "SpecialCombatant"
        ];

        this.boss = [
            "AirBuster"
        ];
    }

}