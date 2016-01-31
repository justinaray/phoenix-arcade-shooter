DefineModule('components/combo-gauge', function (require) {
    var GameObject = require('models/game-object');
    var frameSprite = require('sprites/combo-gauge');
    var Sprite = require('models/sprite');
    var TextDisplay = require('components/text-display');

    return DefineClass(GameObject, {
        index: 1,

        constructor: function (parent, options) {
            this.position = options.position;
            this.sprite = frameSprite();

            this.multiplierDisplay = new TextDisplay(this, {
                font: "arcade-small",
                color: "#ffffff",
                index: 1,
                position: { x: 1 + 7, y: this.position.y + this.sprite.height - 5 }
            });
            this.scoreDisplay = new TextDisplay(this, {
                font: "arcade-small",
                color: "#ffffff",
                index: 1,
                position: { x: 1, y: this.position.y + this.sprite.height + 1 }
            });

            this.super('constructor', arguments);
        },
        reset: function () {
            this.super('reset');

            this.comboPoints = 0;
            this.pointTotal = 0;
            this.multiplierDisplay.changeMessage(pointsToMultiplierDisplay(this.comboPoints));
            this.scoreDisplay.changeMessage(padScoreText(this.pointTotal));

            this.updateGaugeHeight();
            this.addChild(this.multiplierDisplay);
            this.addChild(this.scoreDisplay);
        },

        renderToFrame: function (frame) {
            this.fillGaugeSprite.renderToFrame(frame, this.position.x + 1, this.position.y + 1, this.index - 1);

            this.super('renderToFrame', arguments);
        },

        addPoints: function (points) {
            this.pointTotal += points;
            this.scoreDisplay.changeMessage(padScoreText(this.pointTotal));
            this.updateGaugeHeight();
        },

        bumpCombo: function () {
            this.comboPoints++;
            this.multiplierDisplay.changeMessage(pointsToMultiplierDisplay(this.comboPoints));
        },

        updateGaugeHeight: function () {
            var pixels = [];
            for (var i = 0; i < 59; i++) {
                pixels.push('green');
            }
            this.fillGaugeSprite = new Sprite([
                pixels, pixels, pixels, pixels
            ]);
        }
    });

    function padScoreText(score) {
        score = score + "";
        switch (score.length) {
            case 0: score = "0" + score;
            case 1: score = "0" + score;
            case 2: score = "0" + score;
            case 3: score = "0" + score;
        }

        return score;
    }

    function pointsToMultiplierDisplay(points) {
        return "1x";
    }
});
