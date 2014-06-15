/**
 * Game class
 */

class Game {

    constructor() {

        this._id = _.uniqueId();

    }

    /**
     * Init the game with angular variables
     */
        init($rootScope, $cookieStore, $http, $timeout) {
        // Angular
        this.$rootScope = $rootScope;
        this.$cookieStore = $cookieStore;
        this.$http = $http;
        this.$timeout = $timeout;

        // Detect first load
        this.loaded = false;

        // Fight mode
        this.mode = "normal";

        this.gils = 200;

        this.zones = new Zones(this);

        this.enemies = new Enemies(this);
        this.characters = new Characters(this);

        this.shop = new Shop(this);

        this.weapons = [];
        this.materias = [];
        this.items = [];

        this.data = {};

        this.version = "0.8.4";
    }

    /**
     * Load game infos : characters, enemy & zone
     * depending the zone level
     */
        load() {
        this._loadJSON([
                           ['lines', 'zones', 'enemies', 'weapons', 'materias', 'items'],
                           ['characters']
                       ]);
    }

    /**
     * Load JSON files
     * @param  {array} jsons
     */
        _loadJSON(jsons) {
        if (jsons.length == 0) {
            this.begin();
            return;
        }

        var self = this;
        var n = 0;
        var max = jsons[0].length;
        for (var i in jsons[0]) {
            var loader = '_load_' + jsons[0][i];
            self[loader](function () {
                n++;
                if (n == max) {
                    jsons.splice(0, 1);
                    self._loadJSON(jsons);
                }
            });
        }
    }

    _load_lines(finish) {
        var self = this;
        this.$http.get('data/lines.json').success(function (data) {
            self.data.lines = data;

            finish();
        });
    }

    _load_zones(finish) {
        var self = this;
        this.$http.get('data/zones.json').success(function (data) {
            self.data.zones = data;

            finish();
        });
    }

    _load_enemies(finish) {
        var self = this;
        this.$http.get('data/enemies.json?v=' + new Date().getTime()).success(function (data) {
            self.data.enemies = data;

            finish();
        });
    }

    _load_weapons(finish) {
        var self = this, weapon;
        this.$http.get('data/weapons.json?v=' + new Date().getTime()).success(function (data) {
            self.data.weapons = data;

            finish();
        });
    }

    _load_materias(finish) {
        var self = this, materia;
        this.$http.get('data/materias.json?v=' + new Date().getTime()).success(function (data) {
            self.data.materias = data;

            finish();
        });
    }

    _load_items(finish) {
        var self = this, item;
        this.$http.get('data/items.json?v=' + new Date().getTime()).success(function (data) {
            self.data.items = data;

            finish();
        });
    }

    _load_characters(finish) {
        var self = this;
        this.$http.get('data/characters.json?v=' + new Date().getTime()).success(function (data) {
            self.data.characters = data;

            finish();
        });
    }

    /**
     * Operations that begins after getting data
     */
        begin() {
        var $cookieStore = this.$cookieStore;
        var $timeout = this.$timeout;

        var save = this.$cookieStore.get('game');
        if (save) {
            // Detect old save
            if (_.has(save, 'version') && save.version >= '0.8.3') {
                this.extend(save);
            } else {
                this.reset();
                this.newItems();
            }
        } else {
            this.newItems();
        }

        this.loaded = true;

        this.zones.build();

        this.shop.build();

        this.characters.refresh();

        this.enemies.refresh();

        this.refresh();
    }

    /**
     * Extends the properties with new ones
     * @param  {object} save
     */
        extend(save) {

        // Zones

        for (var i in save.zones.data) {
            var data = save.zones.data[i];
            this.data.zones[data.ref] = _.extend(_.clone(this.data.zones[data.ref]), data);
        }

        this.zones.level = save.zones.level;
        this.zones.levelMax = save.zones.levelMax;

        // Weapons

        for (var i in save.weapons) {
            var data = save.weapons[i];
            data = _.extend(_.clone(this.data.weapons[data.ref]), data);
            this.addWeapon(data);
        }

        // Materias

        for (var i in save.materias) {
            var data = save.materias[i];
            data = _.extend(_.clone(this.data.materias[data.ref]), data);
            this.addMateria(data);
        }

        // Items

        for (var i in save.items) {
            var data = save.items[i];
            data = _.extend(_.clone(this.data.items[data.ref]), data);
            this.addItem(data);
        }

        // Characters

        for (var i in save.characters.data) {
            var data = save.characters.data[i];
            var data = _.extend(_.clone(this.data.characters[data.ref]), data);
            this.characters.add(data);
        }

        this.characters.hp = save.characters.hp;
        this.characters.mp = save.characters.mp;
        this.characters.limit = save.characters.limit;

        // Game

        this.gils = save.gils;
        this.time = save.time;

        this.last_export = JSON.stringify(save);
    }

    /*
     * Basic inventory
     */
    newItems() {
        switch (this.zones.levelMax) {
            case 1: // Cloud & Barret

                this.addCharacter(new Cloud(this), true);
                this.addWeapon(new BusterSword(this), true); // maxMaterias: +1
                //this.addMateria(new Bolt(), true);

                //this.addCharacter(new Barret(), true);
                //this.addWeapon(new GatlingGun(), true); // maxMaterias: +1
                //this.addMateria(new Restore(), true);

                //this.addItem(new Potion());
                //this.addItem(new Potion());

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

    /*
     * @param character
     * @param inTeam
     */
    addCharacter(character, inTeam = false) {
        if (inTeam) {
            this.characters.addTeam(character);
        } else {
            this.characters.addStack(character);
        }
    }

    /*
     * @param weapon
     * @param equipped
     */
    addWeapon(weapon, equipped = false) {
        // equip the weapon
        weapon.equipped = equipped;

        // add weapon to inventory
        this.weapons.push(weapon);
    }

    /*
     * @param materia
     * @param equipped
     */
    addMateria(materia, equipped = false) {
        // equip the materia
        materia.equipped = equipped;

        // add materia to inventory
        this.materias.push(materia);
    }

    /*
     * @param item
     */
    addItem(item) {
        // add item to inventory
        this.items.push(item);
    }

    /**
     * Characters start auto-attacking
     */
        start_fight() {
        if (this.mode == "normal") {
            this.mode = "fight";

            this.characters.autoFighting();
            this.enemies.autoFighting();
        }
    }

    /**
     * Characters stop attacking and wait for next fight
     * @param  {boolean} victory
     */
        end_fight(victory) {
        this.mode = "normal";

        this.characters.stopFighting();
        this.enemies.stopFighting();

        var enemies = this.enemies.getTeam();
        var characters = this.characters.getTeam();

        for (var i in enemies) {
            var enemy = enemies[i];

            // Rewards if victory
            if (victory) {
                this.gils += enemy.gilsReward();

                if (enemy.boss && this.zones.level + 1 > this.zones.levelMax) {
                    // Complete zone
                    this.zones.completed();
                }

                // XP for characters, AP for materias
                for (var j in characters) {
                    var character = characters[j];
                    var xp = enemy.xpReward();
                    var ap = enemy.apReward();
                    character.setXp(xp);
                    if (character.materia()) {
                        character.materia().setAp(ap);
                    }
                }
            }
        }

        this.enemies.remove();
        this.enemies.refresh();
        this.characters.refresh();
    }

    /**
     * Refresh all scopes
     */
        refresh() {
        this.$rootScope.game = this;
    }

    /**
     * Export the game for saving
     * @return {object}
     */
        _export() {
        var zones = this.zones.save();
        var characters = this.characters.save();

        var weapons = [];
        for (var i in this.weapons) {
            weapons.push(this.weapons[i].save());
        }

        var materias = [];
        for (var i in this.materias) {
            materias.push(this.materias[i].save());
        }

        var items = [];
        for (var i in this.items) {
            items.push(this.items[i].save());
        }

        var save = {};

        save.zones = zones;
        save.characters = characters;
        save.weapons = weapons;
        save.materias = materias;
        save.items = items;

        save.gils = this.gils;
        save.time = (new Date()).toLocaleString();
        save.version = this.version;

        return save;
    }

    /**
     * Import a save
     * @param  {Object} save
     */
        _import(save) {
        this.$cookieStore.put('game', save);
    }

    /**
     * Save the game
     */
        save() {
        var save = this._export();
        this.$cookieStore.put('game', save);
        this.time = save.time;
        this.last_export = JSON.stringify(save);
    }

    /**
     * Remove the COOKIE & reset the game
     */
        reset() {
        this.$cookieStore.remove('game');
    }

}