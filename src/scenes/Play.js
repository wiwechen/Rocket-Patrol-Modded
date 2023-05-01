class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('magenta', './assets/magenta_ship.png')
        this.load.image('starsBlack', './assets/starsBlack.png')
        this.load.image('starsWhite', './assets/starsWhite.png')
        

    }

    create(){
        //place tile sprite
        if(game.settings.difficulty == 0){
            this.starfield=this.add.tileSprite(0,0,640,480,'starsWhite').setOrigin(0,0);
        }else{
            this.starfield=this.add.tileSprite(0,0,640,480,'starsBlack').setOrigin(0,0);
        }
        //purple UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x330080).setOrigin(0,0);
        // white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 , 0);
        this.add.rectangle(0 ,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        // add rocket (p1)
        this.p1Rocket=new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
       
        //define keys
       keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

       // add spaceships(x3)
       this.magenta01 = new Magenta(this, game.config.width + borderUISize*6, borderUISize*4, 'magenta', 0, 50).setOrigin(0,0);
       this.ship01 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 30).setOrigin(0,0);
       this.ship02 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0,0);
       this.ship03 = new Spaceship(this, game.config.width + borderUISize*(-3), borderUISize*7 + borderPadding*6, 'spaceship', 0, 10).setOrigin(0,0);

       //animation config
       this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first:0}),
        frameRate: 30
       });

       //initialize score
       this.p1Score = 0;
       //display current score
       let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#E211A0',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
       }
       this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

       //Display High Score
       let hScoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#E211A0',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
       }
       this.highScore = this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding*2, hScore, hScoreConfig);

       //Display fire UI
       let fireUI = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#E211A0',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            botton: 5,
        },
        fixedWidth: 100
       }
       this.fireUI = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, "FIRE", fireUI);
       this.fireUI.visible = false;

       //GAME OVER flag and text;
       scoreConfig.fixedWidth = 0;
       this.gameOver = false;
       this.gameOverUi = this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
       this.restartMenuUi = this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
       this.gameOverUi.visible = false;
       this.restartMenuUi.visible = false;

       
       //All Time related CodeTimer play clock
       
       //Game Over, Time is UP
       this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.gameOverUi.visible = true;
        this.restartMenuUi.visible = true;
        this.gameOver = true;
        
       }, null, this);

       //30 Second Timer Check
       this.thirtySec = this.time.delayedCall(30000, ()=>{
        this.ship01.moveSpeed=(game.settings.spaceshipSpeed) + 4;
        this.ship02.moveSpeed=(game.settings.spaceshipSpeed) + 4;
        this.ship03.moveSpeed=(game.settings.spaceshipSpeed) + 4;
        this.magenta01.moveSpeed=(game.settings.spaceshipSpeed) + 7;

       });
       this.remaining = Math.ceil(this.clock.getRemainingSeconds());
       this.remainingDelayed = this.clock.getRemaining();
       
       //Timer UI Code
       let timeUI = {
        fontFamily: 'Courier',
        fontSize: '28px' ,
        backgroundColor: '#E211A0',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100  
       }
       this.timeUI = this.add.text(borderUISize + borderPadding + 450, borderUISize + borderPadding*2, this.remaining, timeUI);

       //play music
       this.track = this.sound.add('music_space', {
        mute: false,
        volume: 1,
        loop: true
       });
       this.track.play();

       //play random track
       this.sfx = ['bam', 'boof', 'kaboom', 'poof', 'sfx_explosion'];


    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            if(this.p1Score>hScore){
                hScore = this.p1Score;
                this.highScore.text = hScore;
            }
            this.track.stop();
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            hScore = 0;
            this.track.stop();
            this.scene.start("menuScene");
        }


        this.starfield.tilePositionX -= 4;
        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.magenta01.update();
            
        }

        //Code the fire UI
        this.fireUICheck(this.p1Rocket);


        

        //updateTimer
        this.remaining = this.clock.getRemainingSeconds();
        this.timeUI.text = Math.ceil(this.remaining);
        this.remainingDelayed = Math.ceil(this.clock.getRemaining());  //used for adding time


        // check collisons
        if(this.checkCollision(this.p1Rocket, this.ship03)){    
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.clock.remove();
            this.clock = this.time.delayedCall(this.remainingDelayed+2000, () => {
                this.gameOverUi.visible = true;
                this.restartMenuUi.visible = true;
                this.gameOver = true;
            }, null, this);   
        }
        if(this.checkCollisonMagenta(this.p1Rocket, this.magenta01)){
            this.p1Rocket.reset();
            this.magentaExplode(this.magenta01);
            this.clock.remove();
            this.clock = this.time.delayedCall(this.remainingDelayed+3000, () => {
                this.gameOverUi.visible = true;
                this.restartMenuUi.visible = true;
                this.gameOver = true;
            }, null, this);  
        }
        
        
    }
    checkCollision(rocket, ship){
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            } else {
                return false;
            }
    }

    checkCollisonMagenta(rocket, magenta){
        if (rocket.x < magenta.x + magenta.width &&
            rocket.x + rocket.width > magenta.x &&
            rocket.y < magenta.y + magenta.height &&
            rocket.height + rocket.y > magenta.y){
                return true;
            } else {
                return false;
            }

    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha=0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //this.sound.play('sfx_explosion');
        this.sound.play(this.sfx[Math.floor(Math.random() * 5)]);

    }

    magentaExplode(magenta){
        magenta.alpha=0;
        let boom = this.add.sprite(magenta.x, magenta.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            magenta.reset();
            magenta.alpha=1;
            boom.destroy();
        })
        this.p1Score += magenta.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play(this.sfx[Math.floor(Math.random() * 5)]);
    }
    //will show the fireUI if rocket is in play, and dissaper when it isn't
    fireUICheck(rocket){
        if(rocket.isFiring == true){
            this.fireUI.visible = true;
        }else{
            this.fireUI.visible = false;
        }
        
    }

}
