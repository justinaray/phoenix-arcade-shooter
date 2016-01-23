DefineModule('phoenix/title-screen', function (require) {
    var EventedInput = require('models/evented-input');
    var GameObject = require('models/game-object');
    var TextDisplay = require('components/text-display');
    var ArrowShip = require('phoenix/sprites/arrow-ship');

    return DefineClass(GameObject, {
        headerDef: { message: "PHOENIX", position: { x: 50, y: 30 } },
        menuItems: [
            { message: "New", position: { x: 90, y: 90 } },
            { message: "Load", position: { x: 89, y: 105 } },
            { message: "controls", position: { x: 84, y: 120 } }
        ],

        reset: function () {
            this.super('reset');

            this.selectedMenuItem = 0;
            this.timeSinceSelected = 0;
            this.selecting = false;

            this.createTextMenu();

            this.selectorLeft = new GameObject();
            this.selectorRight = new GameObject();

            this.selectorLeft.sprite = new ArrowShip();
            this.selectorRight.sprite = new ArrowShip().invertX();

            this.selectorLeft.position = { x: 70, y: 90 };
            this.selectorRight.position = { x: 115, y: 90 };

            this.addChild(this.selectorLeft);
            this.addChild(this.selectorRight);

            this.addChild(new EventedInput({
                onUp: function () {
                    if (this.selectedMenuItem < this.menuItems.length - 1 && !this.selecting) {
                        this.selectedMenuItem++;
                        this.updateSelectorPosition();
                    }
                }.bind(this),
                onDown: function () {
                    if (this.selectedMenuItem > 0 && !this.selecting) {
                        this.selectedMenuItem--;
                        this.updateSelectorPosition();
                    }
                }.bind(this),
                onSelect: function () {
                    if (!this.selecting) {
                        this.chooseSelected();
                    }
                }.bind(this)
            }));
        },

        createTextMenu: function () {
            this.addChild(new TextDisplay(this, {
                font: 'phoenix',
                message: this.headerDef.message,
                position: this.headerDef.position
            }));

            this.menuItems.forEach(function (item) {
                this.parent.addChild(new TextDisplay(this, {
                    font: "arcade-small",
                    message: item.message,
                    position: item.position,
                    explodable: true
                }));
            }.bind(this));
        },

        update: function (dtime) {
            this.super('update', arguments);

            this.timeSinceSelected += dtime;
            if (this.selecting && this.timeSinceSelected > 595) {
                this.destroy();
                this.parent.startNewGame();
            }
        },

        updateSelectorPosition: function () {
            if (this.selectedMenuItem === 0) {
                this.selectorLeft.position.y = 90;
                this.selectorRight.position.y = 90;
            }
            else if (this.selectedMenuItem === 1) {
                this.selectorLeft.position.y = 105;
                this.selectorRight.position.y = 105;
            }
            else {
                this.selectorLeft.position.y = 120;
                this.selectorRight.position.y = 120;
            }
        },

        chooseSelected: function () {
            this.selecting = true;
            this.timeSinceSelected = 0;

            var x1 = this.selectorLeft.position.x + this.selectorLeft.sprite.width;
            var x2 = this.selectorRight.position.x;
            var y = this.selectorLeft.position.y + Math.floor(this.selectorLeft.sprite.height / 2);

            this.parent.spawnBullet(2, { x: x1, y: y }, { x: 50, y: 0 });
            this.parent.spawnBullet(3, { x: x2, y: y }, { x: -50, y: 0 });
        },

        destroy: function () {
            var parent = this.parent;
            this.menuItems.forEach(function (item) {
                parent.removeChild(item);
            });

            this.super('destroy');
        }
    });
});
