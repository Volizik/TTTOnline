export class Board {
    public cell1 = '';
    public cell2 = '';
    public cell3 = '';
    public cell4 = '';
    public cell5 = '';
    public cell6 = '';
    public cell7 = '';
    public cell8 = '';
    public cell9 = '';
}

export class ServerBoardResponse {
    board: Board;
    winner: string;
}
