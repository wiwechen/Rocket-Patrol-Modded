class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload(){
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      this.load.audio('music_space', './assets/space-chillout-14194.mp3');
      this.load.audio('bam', './assets/bam.wav');
      this.load.audio('boof', './assets/boof.wav');
      this.load.audio('kaboom', './assets/kaboom.wav');
      this.load.audio('poof', './assets/poof.wav');
      this.load.image('starsFull', './assets/starsFull.png');
    }

    create() {
      this.add.sprite(0,0, 'starsFull').setOrigin(0,0);
      //menu text
      let menuConfig = {
        fontFamily: 'Copperplate',
        fontSize: '28px',
        backgroundColor: '#DE3163',
        color: '#ffffff',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
       }


       // show menu text
       this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 100, 
       'ROCKET PATROL', menuConfig).setOrigin(0.5);

       this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, 
       "But it's a passing through modpack", menuConfig).setOrigin(0.5);

       menuConfig.backgroundColor = '#65d9e6';
       menuConfig.color = '#000';
       this.add.text(game.config.width/2, game.config.height/2, 
       'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);



       //Define Keys
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

       //

      
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
        //easy mode
        game.settings = {
          twoPlayer: 0,
          difficulty: 0,
          spaceshipSpeed: 3,
          gameTimer: 60000
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
      }

      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
        //hard mode
        game.settings = {
          twoPlayer: 0,
          difficulty: 1,
          spaceshipSpeed: 4,
          gameTimer: 45000
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
      }


      
    }
  }