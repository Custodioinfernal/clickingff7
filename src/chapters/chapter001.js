class Chapter1 extends Chapter {

    /**
     *
     * @param game
     */
        constructor(game) {
        super(game);

        // available zones
        this.availableZones = [];
    }

    /**
     *
     */
        load() {
        super.load();

        // data to load characters
        var levelMax = this.game.characters.levelMax ? this.game.characters.levelMax : 1;
        var data = {level: levelMax};

        // add cloud in the team
        this.game.characters.add(new Cloud(this.game).load(data), true);
        this.game.weapons.add(new BusterSword(this.game), true);

        // add barret in the team
        this.game.characters.add(new Barret(this.game).load(data), true);
        this.game.weapons.add(new GatlingGun(this.game), true);

        // add materias
        this.game.materias.add(new Restore(this.game), true);
        this.game.materias.add(new Bolt(this.game), true);

        // add items
        this.game.items.add(new Potion(this.game), true);
        this.game.items.add(new Potion(this.game), true);
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