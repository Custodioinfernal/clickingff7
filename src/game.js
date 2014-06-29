/**
 * Game class
 */

class Game {

    constructor($rootScope, $cookieStore, $http, $timeout, $translate) {

        // angular vars
        this.$rootScope = $rootScope;
        this.$cookieStore = $cookieStore;
        this.$http = $http;
        this.$timeout = $timeout;
        this.$translate = $translate;

        // detect first load
        this.loaded = false;

        // language
        this.language = 'en';

        // fight mode
        this.mode = "normal";

        // binding
        this.$rootScope.game = this;

        // load all resources
        this.loader = new Loader(this);
    }

    /**
     *
     */
        run() {
        this.loaded = true;

        // savable models
        this.characters = new Characters(this);
        this.zones = new Zones(this);
        this.weapons = new Weapons(this);
        this.materias = new Materias(this);
        this.items = new Items(this);

        // temp models
        this.battle = new Battle(this);
        this.shop = new Shop(this);
        this.enemies = new Enemies(this);

        // savable vars
        this.time = 0;
        this.gils = 200;
        this.version = "1.0.0-beta.3";

        // save
        this.saves = [];
        var s = localStorage['save1'];
        var save;
        if (s && (save = JSON.parse(atob(s)))) {
            this.saves.push(save);
        }

        //var save = this.$cookieStore.get('game');
        var save = this.saves[0];
        if (save) {
            this.load(save);
            this.zones.checkLastZone();
        } else {
            this.reset();
            this.buildLevel(1);
        }

        this.$translate.use(this.language);

        this.shop.refresh();

        this.characters.refresh();
        this.characters.select();

        this.autoTimer();
    }

    /*
     * Basic inventory
     */
    buildLevel(level) {
        // build zone
        this.zones.add(new window['Zone' + level](this), true);

        // remove characters from the team if not available
        for (var c of this.characters.list) {
            if (c.notAvailable()) {
                c.isNotAvailable = true;
                c.inTeam = false;
            } else {
                c.isNotAvailable = false;
            }
        }

        switch (level) {
            case 1:
                // add cloud in the team
                this.characters.add(new Cloud(this), true);
                this.weapons.add(new BusterSword(this), true);

                // add barret in the team
                this.characters.add(new Barret(this), true);
                this.weapons.add(new GatlingGun(this), true);

                // add materias
                this.materias.add(new Restore(this), true);
                this.materias.add(new Bolt(this), true);

                // add items
                this.items.add(new Potion(this), true);
                this.items.add(new Potion(this), true);

                break;
            case 2:
                // add tifa in the team
                this.characters.add(new Tifa(this), true);
                this.weapons.add(new LeatherGlove(this), true);
                break;
            case 3:
                // add aerith in the team
                this.characters.add(new Aerith(this), true);
                this.weapons.add(new GuardStick(this), true);
                break;
            case 4:
                // add barret & tifa in the team
                for (var c of this.characters.list) {
                    if (c.constructor.name === 'Barret' || c.constructor.name === 'Tifa') {
                        c.inTeam = true;
                    }
                }
            case 5:
                // add redxiii in the team
                //this.addWeapon('mythril-clip', true);
                //this.addMateria('fire', 'redxiii');
                //this.characters.add('redxiii');
                break;
        }

    }

    /**
     * Auto-chrono
     */
        autoTimer() {
        this.$timeout(() => {
            this.time++;
            this.autoTimer();
        }, 1000);
    }

    /**
     * Export the game
     * @returns {{characters: *, zones: *, weapons: *, materias: *, items: *, gils: (number|Game.gils|*), time: number, version: string}}
     */
        export() {
        return {
            characters: this.characters.export(),
            zones     : this.zones.export(),
            weapons   : this.weapons.export(),
            materias  : this.materias.export(),
            items     : this.items.export(),
            gils      : this.gils,
            language  : this.language,
            time      : this.time,
            version   : this.version
        };
    }

    /**
     * Load a save
     * @param save
     * @param confirm
     */
        load(save, confirm = true) {
        if (!confirm) {
            return;
        }

        // characters
        for (var c of save.characters.list) {
            var character = new window[c.model](this).load(c);
            this.characters.add(character, c.inTeam);
        }

        this.characters.hp = save.characters.hp;
        this.characters.mp = save.characters.mp;
        this.characters.limit = save.characters.limit;

        // zones
        for (var z of save.zones.list) {
            var zone = new window[z.model](this).load(z);
            this.zones.add(zone);
        }

        this.zones.level = save.zones.level;
        this.zones.levelMax = save.zones.levelMax;

        // weapons
        for (var w of save.weapons) {
            var weapon = new window[w.model](this).load(w);
            this.weapons.add(weapon, w.equipped);
        }

        // materias
        for (var m of save.materias) {
            var materia = new window[m.model](this).load(m);
            this.materias.add(materia, m.equipped);
        }

        // items
        for (var i of save.items) {
            var item = new window[i.model](this).load(i);
            this.items.add(item, i.equipped);
        }

        this.language = save.language;

        this.time = save.time;
        this.gils = save.gils;

        this.loaded = true;
    }

    /**
     * @param confirm
     */
        save(confirm = true) {
        if (!confirm) {
            return;
        }

        var s = this.export();
        this.saves[0] = s;

        var ss = btoa(JSON.stringify(s));
        localStorage['save1'] = ss;
        this.lastExport = ss;
        //this.$cookieStore.put('save1', ss);
    }

    /**
     * Remove the COOKIE & reset the game
     */
        reset() {
        this.saves = [];

        localStorage.removeItem('save1');
        //this.$cookieStore.remove('game');
    }

}