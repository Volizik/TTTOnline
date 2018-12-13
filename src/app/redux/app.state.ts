import {IGameData} from '../login/login.interfaces';

export interface AppState {
    gameState: {
        games: IGameData[]
    };
    settingsState: {
        selectedTabIndex: number
    };
}
