DefineModule('main', function (require) {
    var newCanvasRenderer = require('views/canvas-renderer');

    var gameDimensions = { width: 100, height: 75 };
    var gameModel = newPhoenixModel(gameDimensions);
    var gameView = newCanvasRenderer(gameDimensions);
    var runLoop = newRunLoop();
    var inputController = newKeyboardInputController();

    window.activeGame = newGameController({
        renderer: gameView,
        input: inputController,
        runLoop: runLoop,
        model: gameModel
    });
});
