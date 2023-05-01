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
    }

    create() {
      //menu text
      let menuConfig = {
        fontFamily: 'Copperplate',
        fontSize: '28px',
        backgroundColor: '#ff66a3',
        color: '#cc0052',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
       }


       // show menu text
       this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
       'ROCKET PATROL', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2, 
       'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
       menuConfig.backgroundColor = '#00ffff';
       menuConfig.color = '#000';
       this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
       'Press <- for Novice or -> for Expert or', menuConfig).setOrigin(0.5);
       this.add.text(game.config.width/2, game.config.height/2 + borderUISize + (5*borderPadding), 
       'DOWN for 2p Novice or UP for 2p Expert', menuConfig).setOrigin(0.5);

       //Define Keys
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       //

      
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
        //easy mode
        game.settings = {
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
          difficulty: 1,
          spaceshipSpeed: 4,
          gameTimer: 45000
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
      }
      
    }
  }