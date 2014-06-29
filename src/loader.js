class Loader {

    /**
     * Init
     * @param game
     */
        constructor(game) {
        this.game = game;

        // list all files
        this.files = [
            {label  : "Loading main files",
                list: [
                    "dist/battle.js",
                    "dist/characters.js",
                    "dist/character.js",
                    "dist/enemies.js",
                    "dist/enemy.js",
                    "dist/item.js",
                    "dist/items.js",
                    "dist/materia.js",
                    "dist/materias.js",
                    "dist/shop.js",
                    "dist/weapon.js",
                    "dist/weapons.js",
                    "dist/zone.js",
                    "dist/zones.js"
                ]},
            {label  : "Loading resource files",
                list: [
                    "dist/characters/barret.js",
                    "dist/characters/cloud.js",
                    "dist/characters/tifa.js",
                    "dist/characters/aerith.js",
                    "dist/enemies/zone1/first-ray.js",
                    "dist/enemies/zone1/grunt.js",
                    "dist/enemies/zone1/guard-scorpion.js",
                    "dist/enemies/zone1/mp.js",
                    "dist/enemies/zone1/sweeper.js",
                    "dist/enemies/zone2/air-buster.js",
                    "dist/enemies/zone2/blood-taste.js",
                    "dist/enemies/zone2/proto-machinegun.js",
                    "dist/enemies/zone2/smogger.js",
                    "dist/enemies/zone2/special-combatant.js",
                    "dist/enemies/zone3/aps.js",
                    "dist/enemies/zone3/hedgehog-pie.js",
                    "dist/enemies/zone3/hell-house.js",
                    "dist/enemies/zone3/vice.js",
                    "dist/enemies/zone3/whole-eater.js",
                    "dist/enemies/zone4/aero-combatant.js",
                    "dist/enemies/zone4/deenglow.js",
                    "dist/enemies/zone4/eligor.js",
                    "dist/enemies/zone4/guard-hound.js",
                    "dist/enemies/zone4/reno.js",
                    "dist/items/potion.js",
                    "dist/items/ether.js",
                    "dist/materias/restore.js",
                    "dist/materias/bolt.js",
                    "dist/weapons/broadswords/bustersword.js",
                    "dist/weapons/gun-arms/gatling-gun.js",
                    "dist/weapons/gun-arms/assault-gun.js",
                    "dist/weapons/knuckles/leather-glove.js",
                    "dist/weapons/staves/guard-stick.js",
                    "dist/zones/zone1.js",
                    "dist/zones/zone2.js",
                    "dist/zones/zone3.js",
                    "dist/zones/zone4.js"
                ]}
        ];

        this.filesLoaded = 0;
        this.filesRemain = this.getNbFiles();
        this.nbFiles = this.getNbFiles();
        this.currentLabel = '';

        // load
        this.run();
    }

    /**
     * Load a group of files
     * @param group
     */
        run(group = 0) {
        var that = this;
        var groupRemain = this.files[group].list.length;
        this.currentLabel = this.files[group].label;

        for (var file of this.files[group].list) {

            head.load(file, function() {
                groupRemain--;
                that.filesRemain--;
                that.filesLoaded++;
                that.game.$rootScope.$apply();
                if (that.filesRemain === 0) {
                    that.game.run();
                } else if (groupRemain === 0) {
                    that.run(++group);
                }
            });
        }
    }

    /**
     * Return number of groups
     * @returns {Number}
     */
        getNbGroups() {
        return this.files.length;
    }

    /**
     * Return number of files to load
     * @returns {number}
     */
        getNbFiles() {
        var i = 0;
        for (var group of this.files) {
            for (var file of group.list) {
                i++;
            }
        }
        return i;
    }

    /*
     * @param pixels_max
     * @returns {number}
     */
    loadProgress(pixels_max) {
        return (this.filesLoaded == 0 ? 0 : this.filesLoaded / this.nbFiles * pixels_max);
    }

}