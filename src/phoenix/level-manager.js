DefineModule('phoenix/level-manager', function (require) {
    var GameObject = require('models/game-object');
    var Level_01 = require('phoenix/levels/level-01');
    var TextDisplay = require('models/text-display');

    return DefineClass(GameObject, {
        levels: [null, Level_01],

        constructor: function (game) {
            this.super('constructor', arguments);

            this.game = game;
            this.levelIndex = 1;
        },

        startLevel: function () {
            var LevelClass = this.levels[ this.levelIndex ];

            this.currentLevel = new LevelClass(this, this.game);
            this.addChild(this.currentLevel);
            this.currentLevel.start();

            this.addChild(new TextDisplay(this, {
                message: [
                    "ABCDEFGHIJKLMNOPQRSTUVWXY",
                    "Zabcdefghijklmnopqrstuvwxyz",
                    "0123456789 !.,?",
                    "This is a test sentence.","THIS IS A TEST SENTENCE.",
                    "How readable is this text?","HOW READABLE IS THIS TEXT?"
                ],
                position: { x: 0, y: 0 }
            }));
        },
        update: function () {
            this.super('update', arguments);

            if (this.currentLevel && this.currentLevel.checkIfLevelComplete()) {
                /* clear level and stuff */
                this.currentLevel.cleanup();
                this.removeChild(this.currentLevel);
                this.currentLevel = null;
                console.log('level finished');
            }
        }
    });
});
