import {IGameData} from './login/login.interfaces';

export interface ITttServerResponseData {
    gameObj?: IGameData;
    gameArr?: IGameData[];
    status: string;
    error?: any;
    winner?: string;
}
