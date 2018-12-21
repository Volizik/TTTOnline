import * as mongoose from 'mongoose';
import {Request, Response} from 'express';

import {GameSchema} from '../models/gameModel';
import {IGame} from '../interfaces/iGame';

const Game = mongoose.model('Game', GameSchema);

export class GameController {

    public create(req: Request, res: Response): void {
        try {
            Game.findOne({name: req.body.name, status: 'waiting'}, function (err: Error, doc: IGame) {
                if (err) {
                    res.send(err);
                }
                if (doc) {
                    res.sendStatus(409);
                } else {
                    const newGame = new Game(req.body);
                    newGame.save((error: Error, game: IGame) => {
                        if (err) {
                            res.send(error);
                        }
                        res.status(201).json({status: 'OK', gameObj: game});
                    });
                }
            });
        } catch (e) {
            res.send({status: 'ERROR', error: e});
        }
    }

    public join(req: Request, res: Response): void {
        try {
            Game.findOne({_id: req.body.id}, function (err: Error, doc) {
                if (err) {
                    res.send(err);
                }
                // Если пароль подходит
                if (req.body.password === doc.password) {
                    doc.status = 'in_progress';
                    doc.save((error: Error, game: IGame) => {
                        if (error) {
                            res.send(error);
                        }
                        res.status(200).json({status: 'OK', gameObj: game});
                    });
                } else {
                    // Если пароль не подходит
                    res.sendStatus(403);
                }
            });
        } catch (e) {
            res.send({status: 'ERROR', error: e});
        }
    }

    public get_games(req: Request, res: Response): void {
        try {
            Game.find({status: 'waiting'}, function (err: Error, docs: IGame[]) {
                res.status(200).send({gameArr: docs, status: 'OK'});
            });
        } catch (e) {
            res.send({status: 'ERROR', error: e});
        }
    }

}
