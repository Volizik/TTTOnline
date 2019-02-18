"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var gameModel_1 = require("../models/gameModel");
var Game = mongoose.model('Game', gameModel_1.GameSchema);
var GameController = /** @class */ (function () {
    function GameController() {
    }
    GameController.prototype.create = function (req, res) {
        try {
            Game.findOne({ name: req.body.name, status: 'waiting' }, function (err, doc) {
                if (err) {
                    res.send(err);
                }
                if (doc) {
                    res.sendStatus(409);
                }
                else {
                    var newGame = new Game(req.body);
                    newGame.save(function (error, game) {
                        if (err) {
                            res.send(error);
                        }
                        res.status(201).json({ status: 'OK', gameObj: game });
                    });
                }
            });
        }
        catch (e) {
            res.send({ status: 'ERROR', error: e });
        }
    };
    GameController.prototype.join = function (req, res) {
        try {
            Game.findOne({ _id: req.body.id }, function (err, doc) {
                if (err) {
                    res.send(err);
                }
                // Если пароль подходит
                if (req.body.password === doc.password) {
                    doc.status = 'in_progress';
                    doc.save(function (error, game) {
                        if (error) {
                            res.send(error);
                        }
                        res.status(200).json({ status: 'OK', gameObj: game });
                    });
                }
                else {
                    // Если пароль не подходит
                    res.sendStatus(403);
                }
            });
        }
        catch (e) {
            res.send({ status: 'ERROR', error: e });
        }
    };
    GameController.prototype.get_games = function (req, res) {
        try {
            Game.find({ status: 'waiting' }, function (err, docs) {
                res.status(200).send({ gameArr: docs, status: 'OK' });
            });
        }
        catch (e) {
            res.send({ status: 'ERROR', error: e });
        }
    };
    return GameController;
}());
exports.GameController = GameController;
