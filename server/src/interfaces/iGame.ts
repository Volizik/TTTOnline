export interface IGame {
    name: string;
    password?: string;
    created_at?: string;
    _id?: string;
    status?: string;
}
export interface IGameWinner {
    status: string;
    winner?: string;
}
