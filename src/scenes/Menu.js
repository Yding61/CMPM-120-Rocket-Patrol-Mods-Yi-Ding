// rocket  spear  spaceship  ship  sharkSpeed  spaceshipSpeed  (index for searching)

class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select','./assets/game-fx.wav');       // the music is from "freesound", the author is "danlucaz" ,     "https://freesound.org/s/517758/"
        this.load.audio('sfx_explosion','./assets/game-bump.mp3');  // the music is from "freesound", the author is "Raclure" ,      "https://freesound.org/s/483602/"
        this.load.audio('sfx_rocket','./assets/bubble.wav');        // the music is from "freesound", the author is "javierserrat",  "https://javierserrat.wordpress.com", "https://freesound.org/s/485065/"
        this.load.audio('bgm','./assets/dive-deep.mp3');            // the music is from "freesound", the author is "hisoul" ,       "https://www.asoundeffect.com/sound-library/dive-deep-2/" ,"https://freesound.org/s/493076/""
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Deep Sea Hunting', menuConfig).setOrigin(0.5,2);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1: Use (←),(→) arrows to move & (↑) to fire',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 2: Use (A),(D) to move & (W) to fire',menuConfig).setOrigin(0.5,-1);
        menuConfig.backgroundColor = '#e6f516';
        menuConfig.color = '#4b9fdb';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5,-2.5);

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

