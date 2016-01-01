DefineModule('main', function (require) {
    var newCanvasRenderer = require('views/canvas-renderer');
    var newRunLoop = require('helpers/run-loop');
    var KeyboardInputController = require('controllers/keyboard-input');
    var GameController = require('controllers/game');
    var Phoenix = require('phoenix/game');

    var gameDimensions = { width: 200, height: 150 };

    window.activeGame = new GameController({
        renderer: newCanvasRenderer(gameDimensions),
        input: new KeyboardInputController(),
        runLoop: newRunLoop(),
        model: new Phoenix(gameDimensions)
    });
});
