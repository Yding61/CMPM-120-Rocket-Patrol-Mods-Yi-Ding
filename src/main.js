let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyA, keyD, keyW, keyR, keyLEFT, keyRIGHT, keyUP;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
