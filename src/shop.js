class Shop {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;
        this.section = 'weapons';
        this.weapons = [];
        this.refresh();
    }

    refresh() {
        var weapons = [
            'BusterSword',
            'GatlingGun',
            'AssaultGun',
            'LeatherGlove'
        ];
        for (var w of weapons) {
            var weapon = new window[w](this.game);
            if (weapon.available(this.game.zones.levelMax)) {
                this.weapons.push(weapon);
            }
        }
    }


}