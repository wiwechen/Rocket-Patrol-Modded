/***************************************************************************
 * Name: William Chen
 * mod title:
 * time it took:
 * Mods I Chose:
 * [COMPLETE]Track High Score(5pts)
 * [COMPLETE]Fire UI, it shows FIRE on UI when rocket is in play, Disapers when rocket at start(5pts)
 * [50%]Increase Speed for spaceship after 30 seconds(5pts)
 * Create new scrolling tile sprite for the background (5pts)
 * Add copyright free background music to the Play scene(5pts)
 * Create 4 new explosion sound effects(10pts)
 * [50%]Display time remaning (10pts)
 * [50%]Create New Title Screen(e.g new artwork, typography, layout) (10pts)
 * Implement an altering two-player mode(15pts)
 * Create new enemy Spaceship type, new art, smaller, faster, worth more points (15pts)
 * 
 * (delete later)Points Completed
 * Done:
 * 5+5
 * Working On:
 * 10+10+5
 * 
 * 
 * Sources:
 * Showing and hiding text for fire UI: https://stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
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
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyUP; //set Down to be 2p novice, set Up to be 2p expert

//reserve highscore vars
let hScore=0;

