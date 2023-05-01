/***************************************************************************
 * Name: William Chen
 * mod title:
 * time it took:
 * Mods I Chose:
 * [COMPLETE]Track High Score(5pts)
 * [COMPLETE]Fire UI, it shows FIRE on UI when rocket is in play, Disapers when rocket at start(5pts)
 * [COMPLETE]Increase Speed for spaceship after 30 seconds(5pts)
 * [COMPLETE]Create new scrolling tile sprite for the background (5pts)
 * [COMPLETE]Add copyright free background music to the Play scene(5pts)
 * [COMPLETE]Create 4 new explosion sound effects(10pts)
 * [COMPLETE]Display time remaning (10pts)
 * [COMPLETE]Create New Title Screen(e.g new artwork, typography, layout) (10pts)
 * [Maybe]Implement an altering two-player mode(15pts)
 * [COMPLETE]Create new enemy Spaceship type, new art, smaller, faster, worth more points (15pts)
 * [COMPLETE]Implement a new timing/scoring mechanism that adds time to the clock for successful hits on top ship(15pts)
 * 
 * 
 * 
 * (delete later)Points Completed
 * Done:
 * 5+5+10+5+15+5+10+15+5+10
 * Working On:
 * 15
 * 
 * Done+Working = 85 + 15 = 100
 * 
 * Sources:
 * Showing and hiding text for fire UI: https://stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
 * Phaser3 Timer Documentation: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
 * Music by <a href="https://pixabay.com/users/penguinmusic-24940186/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=14194">penguinmusic</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=14194">Pixabay</a> 
 * Music resource https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
 * random in javascript https://www.w3schools.com/jsref/jsref_random.asp
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

