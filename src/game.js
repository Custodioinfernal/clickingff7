/**
 * Game class
 */

class Game {

    constructor($rootScope, $cookieStore, $http, $timeout) {

        // angular vars
        this.$rootScope = $rootScope;
        this.$cookieStore = $cookieStore;
        this.$http = $http;
        this.$timeout = $timeout;

        // detect first load
        this.loaded = false;

        // fight mode
        this.mode = "normal";

        // savable models
        this.characters = new Characters(this);
        this.zones = new Zones(this);
        this.weapons = new Weapons(this);
        this.materias = new Materias(this);
        this.items = new Items();

        // temp models
        this.battle = new Battle(this);
        this.shop = new Shop(this);
        this.enemies = new Enemies(this);
        this.data = {};

        // savable vars
        this.time = 0;
        this.gils = 200;
        this.version = "0.9.0";

        // do the magic ;)
        this.run();
    }

    /**
     *
     */
        run() {
        var $cookieStore = this.$cookieStore;
        var $timeout = this.$timeout;

        var save = this.$cookieStore.get('game');
        if (save) {
            // Detect old save
            if (_.has(save, 'version') && save.version >= '0.8.3') {
                this.extend(save);
            } else {
                this.reset();
                this.refresh();
            }
        } else {
            this.refresh();
        }

        this.loaded = true;

        this.characters.refresh();

        this.autoTimer();

        this.$rootScope.game = this;
    }

    /*
     * Basic inventory
     */
    refresh(level = 1) {
        switch (level) {
            case 1:

                this.zones.add(new Zone1(this), true);

                this.characters.add(new Cloud(this), true);
                this.weapons.add(new BusterSword(this), true);

                this.characters.add(new Barret(this), true);
                this.weapons.add(new GatlingGun(this), true);

                this.materias.add(new Restore(this), true);
                //this.materias.add(new Bolt(this), true);

                //this.items.add(new Potion(this), true);
                //this.items.add(new Potion(this), true);

                break;
            case 2: // Tifa
                this.addWeapon('leather-glove', true);
                this.characters.add('tifa');
                break;
            case 3: // Aerith
                this.addWeapon('guard-stick', true);
                this.characters.add('aerith');
                break;
            case 5: // Red XIII
                this.addWeapon('mythril-clip', true);
                this.addMateria('fire', 'redxiii');
                this.characters.add('redxiii');
                break;
        }

    }

    /**
     * Auto-chrono
     */
    autoTimer() {
        this.$timeout( () => {
            this.time++;
            this.autoTimer();
        }, 1000);
    }

    /**
     * Return the time spent on the game since the beginning
     */
        getTime() {
        var elapsed = this.time;
        var hours = Math.floor(elapsed / 3600);
        elapsed -= hours * 3600;

        var minutes = Math.floor(elapsed / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        var seconds = elapsed - minutes * 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }

    /**
     * @returns {{characters: Array, gils: *, time: (*|time)}}
     */
        export() {
        return {
            characters: this.characters.export(),
            zones     : this.zones.export(),
            weapons   : this.weapons.export(),
            materias  : this.materias.export(),
            items     : this.items.export(),
            gils      : this.gils,
            time      : this.time,
            version   : this.version
        };
    }

    /**
     * @param confirm
     */
        load(confirm) {
        if (!confirm) {
            return;
        }

        var save = this.saves[0];

        // characters
        for (var i of save.characters) {
            this.characters.push(i);
        }

        // zones
        for (var i of save.zones) {
            this.zones.push(i);
        }

        // weapons
        for (var i of save.weapons) {
            this.weapons.push(i);
        }

        // materias
        for (var i of save.materias) {
            this.materias.add(i);
        }

        // items
        for (var i of save.items) {
            this.items.add(i);
        }

        this.time = save.time;
        this.gil = save.gil;

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
        console.log(s);
        return;
        this.saves[0] = new Save(this, s);

        var ss = btoa(JSON.stringify(s));
        localStorage['save1'] = ss;
        this.$cookieStore.put('save1', ss);
    }

    /**
     * Remove the COOKIE & reset the game
     */
        reset() {
        this.saves[0] = null;

        localStorage.removeItem('save1');
        this.$cookieStore.remove('game');
    }

}