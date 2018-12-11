import * as mongoose from 'mongoose';
import {GameSchema} from '../models/gameModel';
import {Request, Response} from 'express';
import IGame from '../interfaces/iGame';
import {TttLogic} from '../helpers/ttt.logic';

const Game = mongoose.model('Game', GameSchema);

export class GameController {

    public create(req: Request, res: Response): void {
        try {
            Game.findOne({name: req.body.name}, function (err, doc) {
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
                        res.status(201).json(game);
                    });
                }
            });
        } catch (e) {
            res.send(e);
        }
    }

    public join(req: Request, res: Response): void {
        Game.findOne({_id: req.body._id}, function (err: Error, doc) {
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
                    res.status(200).json(game);
                });
            } else {
                // Если пароль не подходит
                res.sendStatus(403);
            }
        });
    }

    public get_games(req: Request, res: Response): void {
        Game.find({status: 'waiting'}, function (err, docs) {
            res.status(200).send(docs);
        });
    }

    public set_step(req: Request, res: Response): void {
        const result = new TttLogic(req.body).checkIfWin();
        if (result === '') {
            res.status(200).json({status: `OK`});
        } else if (result === 'x') {
            res.status(200).json({status: 'x'});
        } else {
            res.status(200).json({status: 'o'});
        }
    }
}
