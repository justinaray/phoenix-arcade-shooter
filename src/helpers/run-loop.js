DefineModule('helpers/run-loop', function (require) {

    function updateFPScounter(dtime) {
        var fps = 1000 / dtime;
        console.log(fps);
    }

    function now() {
        return (new Date()).valueOf();
    }

    function fpsTracker() {
        var frameTimes = [ ];

        for (var i = 0; i < 100; i++) {
            frameTimes.push(20);
        }
        frameTimes.totalTime = 20 * 100;

        frameTimes.push = function (ftime) {
            var overflow = this.shift();
            this.totalTime += ftime - overflow;
            return Array.prototype.push.call(this, ftime);
        };
        frameTimes.average = function () {
            return this.totalTime / this.length;
        };

        return frameTimes;
    }

    return DefineClass({
        constructor: function (callback) {
            this.callback = callback || function () {};

            this.fpsTracker = fpsTracker();
            this.active = false;
            this.lastFrameTime = now();
            this.boundFrameHandler = this.frameHandler.bind(this);
        },
        frameHandler: function () {
            if (!this.active) return;

            var currentTime = now();
            var dtime = currentTime - this.lastFrameTime;

            this.lastFrameTime = currentTime;
            this.updateFPScounter(dtime);

            try {
                this.callback(dtime);
            } catch (e) {
                console.error('Error running frame: ', e);
            }

            window.requestAnimationFrame(this.boundFrameHandler);
        },
        start: function () {
            if (!this.active) {
                this.active = true;
                window.requestAnimationFrame(this.boundFrameHandler);
            }
        },
        stop: function () {
            this.active = false;
        },
        addCallback: function (callback) {
            this.callback = callback;
        },
        updateFPScounter: function (dtime) {
            this.fpsTracker.push(dtime);

            updateFPScounter(this.fpsTracker.average());
        }
    });
});
