

class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }


    preload() {
        // load images/title sprites
        this.load.image('spear','./assets/spear.png');   // All of the images are painted by Yi Ding (myself) by "Pixel Studio for pixel art"
        this.load.image('shark','./assets/shark.png');
        this.load.image('ocean','./assets/ocean.png');
        // load spritesheet
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});



    }
    create() {
        // place tile sprite
        this.ocean = this.add.tileSprite(0, 0, 640, 480, 'ocean').setOrigin(0, 0);
        // green UI background   
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x0091ff).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x014e8c).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,0x014e8c).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x014e8c).setOrigin(0, 0);  
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize,game.config.height, 0x014e8c).setOrigin(0, 0);   
        // add spear (p1)
        this.p1Spear = new Spear(this, game.config.width/2+40, game.config.height - borderUISize - borderPadding,'spear', 0, keyLEFT, keyRIGHT).setOrigin(0.5, 0);

        // add spear (p2)
        this.p2Spear = new Spear2(this, game.config.width/2-40, game.config.height - borderUISize - borderPadding,'spear', 0, keyA, keyD).setOrigin(0.5, 0);

        // add shark (x3)
        this.ship01 = new Shark(this, game.config.width + borderUISize*6, borderUISize*4, 'shark', 0,30).setOrigin(0, 0);
        this.ship02 = new Shark(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'shark', 0,20).setOrigin(0, 0);
        this.ship03 = new Shark(this, game.config.width , borderUISize*6 + borderPadding*4, 'shark', 0,10).setOrigin(0, 0);

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);  //   Player 1: W for Firing
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);  //   Player 1: A for Left moving
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);  //   Player 1: D for Right moving
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);  //   R for restart
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);  //   Player 2: left for left moving
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);  //   Player 2: right for Right moving
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);  //   Player 2: up for player 2 firing

        //animation config
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start: 0, end:9, first: 0}),
            frameRate: 30
        });

        // initial score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Fantasy',
            fontSize: '28px',
            backgroundColor: '#41c4f3',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);


        //GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000,() => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null,this);
    }
    update() {

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
            this.ocean.tilePositionX -= 3;
        if (!this.gameOver) {    
            this.p1Spear.update();
            this.p2Spear.update();
            this.ship01.update();        // update sharks (x3)
            this.ship02.update();
            this.ship03.update();  
        }


        // check collision
        if (this.checkCollision(this.p1Spear, this.ship01)) {
            //console.log('kaboom ship 01')
            this.p1Spear.reset();
            //this.ship01.reset();
            this.shipExplode(this. ship01);
        }
        if (this.checkCollision(this.p1Spear, this.ship02)) {
            //console.log('kaboom ship 02')
            this.p1Spear.reset();
            //this.ship02.reset();
            this.shipExplode(this. ship02);
        }
        if (this.checkCollision(this.p1Spear, this.ship03)) {
            //console.log('kaboom ship 03')
            this.p1Spear.reset();
            //this.ship03.reset();
            this.shipExplode(this. ship03);
        }



        // check clooision Spear 2
        if (this.checkCollision(this.p2Spear, this.ship01)) {
            //console.log('kaboom ship 01')
            this.p2Spear.reset();
            //this.ship01.reset();
            this.shipExplode(this. ship01);
        }
        if (this.checkCollision(this.p2Spear, this.ship02)) {
            //console.log('kaboom ship 02')
            this.p2Spear.reset();
            //this.ship02.reset();
            this.shipExplode(this. ship02);
        }
        if (this.checkCollision(this.p2Spear, this.ship03)) {
            //console.log('kaboom ship 03')
            this.p2Spear.reset();
            //this.ship03.reset();
            this.shipExplode(this. ship03);
        }
    }


    

    checkCollision(spear, ship) {
        // simple AABB checking
        if (spear.x < ship.x + ship.width &&
            spear.x + spear.width > ship.x &&
            spear.y < ship.y + ship.height &&
            spear.height + spear.y > ship. y) {
                return true;
        } else {
            return false;

        }

    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');               //play explode animation
        boom.on('animationcomplete', () =>{       //callback after anim completes
            ship.reset();                         //reset ship position
            ship.alpha = 1;                       //make ship visible again
            boom.destroy();                       //remove explosion sprite

        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // explosion audio
        this.sound.play('sfx_explosion');

    }
}
