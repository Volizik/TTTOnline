import {Request, Response} from 'express';
import {GameController} from './controllers/gameController';
import * as path from 'path';

export class Routes {
    public gameController: GameController = new GameController();

    public routes(app): void {
        app.post('/api/create', this.gameController.create);
        app.post('/api/join', this.gameController.join);
        app.get('/api/get_games', this.gameController.get_games);
        app.get('/*', (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../../dist/TTTonline/index.html'));
        });
    }
}
