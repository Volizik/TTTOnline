import {Request, Response} from 'express';
import {GameController} from './controllers/gameController';

export class Routes {
    public gameController: GameController = new GameController();

    public routes(app): void {
        app.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.post('/api/create', this.gameController.create);
        app.post('/api/join', this.gameController.join);
        app.get('/api/get_games', this.gameController.get_games);
    }
}
