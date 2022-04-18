// rocket  spear  spaceship  ship  sharkSpeed  spaceshipSpeed  (index for searching)

class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select','./assets/blip_select12.wav');
        this.load.audio('sfx_explosion','./assets/explosion38.wav');
        this.load.audio('sfx_rocket','./assets/rocket_shot.wav');
        this.load.audio('bgm','./assets/Oasis.mp3'); /// here is a music that is NOT copyfree, just use for background music testing
    }

    

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Fantasy',   //  change font
            fontSize: '28px',
            backgroundColor: '#2e82c7',
            color: '#e8eb34',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Deep Sea Hunting', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire',menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#e6f516';
        menuConfig.color = '#4b9fdb';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                sharkSpeed: 1,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
            this.sound.play('bgm');

        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                sharkSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
            this.sound.play('bgm');
        }
    }
}

