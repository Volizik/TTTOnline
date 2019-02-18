"use strict";
exports.__esModule = true;
var gameController_1 = require("./controllers/gameController");
var path = require("path");
var Routes = /** @class */ (function () {
    function Routes() {
        this.gameController = new gameController_1.GameController();
    }
    Routes.prototype.routes = function (app) {
        app.post('/api/create', this.gameController.create);
        app.post('/api/join', this.gameController.join);
        app.get('/api/get_games', this.gameController.get_games);
        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../dist/TTTonline/index.html'));
        });
    };
    return Routes;
}());
exports.Routes = Routes;
