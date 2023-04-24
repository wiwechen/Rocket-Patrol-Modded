/***************************************************************************
 * Name: William Chen
 * mod title:
 * time it took:
 * Mods I Chose:
 * Track High Score(5pts)
 * Fire UI, it shows FIRE on UI when rocket is in play, Disapers when rocket at start(5pts)
 * Create 4 new explosion sound effects(10pts)
 * Display time remaning (10pts)
 * Create New Title Scree (10pts)
 * Implement an altering two-player mode(15pts)
 * Create new enemy Spaceship type, new art, smaller, faster, worth more points (15pts)
 * 
 * Sources:
 * 
 * 
 * 
 * 
 * 
 * 
 ******************************************************************************/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ] 
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

