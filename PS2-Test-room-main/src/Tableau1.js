class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled!
        this.load.image('listrik','assets/square.png')

        this.load.image('pile','assets/Pile.png');
        this.load.image('platfer','assets/squareY.png');

        this.load.image('bg','assets/images/background.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {
        this.Battery = 2500;
        this.recharge = false;
        this.turn = false;
        this.tailleListrik = 32;
        this.taillePile = 16;
        let me = this;

        this.largeurmap = 800;
        this.hateur = 450 ;




        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "game_tile",
            "tilemap"
        );

        // chargement du calque plateformes
        const platforms = map.createLayer(
            "calque_plateformes",
            tileset
        );


        const bg = map.createLayer(
            "bg",
            tileset
        );

        // Création du personnage de base
        this.Listrik = this.physics.add.sprite(150, 200, 'listrik').setOrigin(0, 0);
        this.Listrik.setDisplaySize( this.tailleListrik, this.tailleListrik);
        this.Listrik.body.setAllowGravity(true);
        this.Listrik.setVisible(true);
        this.Listrik.setVelocityY(0);

        // chargement du calque décors
        const decors = map.createLayer(
            "calque_objet_visible",
            tileset
        );


        platforms.setCollisionByExclusion(-1, true);

        this.physics.add.collider(this.Listrik, platforms);
        this.cameras.main.startFollow(this.Listrik) ;
        this.initKeyboard();
    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.



    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.Listrik.setVelocityX(0);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.Listrik.setVelocityX(0);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                        me.Listrik.setVelocityX(-300);
                        me.turn = true;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.Listrik.setVelocityX(300);
                        me.turn = false;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.Listrik.body.onFloor(true)){
                        me.Listrik.setVelocityY(-350)
                    }
                    else{
                        console.log("test");
                    }



                    break;




            }
        })
    }

    update(){
    }

    // fin du programme
}