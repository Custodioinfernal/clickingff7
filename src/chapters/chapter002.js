class Chapter2 extends Chapter {

    /**
     *
     * @param game
     */
        constructor(game) {
        super(game);

        // available zones
        this.availableZones = [];

        // current zone (must be in the available zones)
        this.newZones = [2];
    }

    /**
     *
     */
        load() {
        super.load();

        // data to load characters
        var levelMax = this.game.characters.levelMax ? this.game.characters.levelMax : 1;
        var data = {level: levelMax};

        // add tifa in the team
        this.game.characters.add(new Tifa(this.game).load(data), true);
        this.game.weapons.add(new LeatherGlove(this.game), true);
    }

    /**
     *
     */
        fight() {

    }

    /**
     *
     */
        success() {

    }

    /**
     *
     */
        fail() {

    }

}