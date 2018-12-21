import {IBoard, IBoardResponse} from '../interfaces/iBoard';

export class TttLogic {

    private board: IBoard;
    constructor() {}

    public checkIfWin(board: IBoard): IBoardResponse {
        this.board = board;
        const res = {
            board: board,
            winner: ''
        };
        if (this.horizontal()) {
            res.winner = this.horizontal();
        } else if (this.vertical()) {
            res.winner = this.vertical();
        } else if (this.diagonal()) {
            res.winner = this.diagonal();
        }
        return res;
    }

    private horizontal(): string {
        if (this.board.cell1 === this.board.cell2 && this.board.cell1 === this.board.cell3) {
            return this.board.cell1;
        }
        if (this.board.cell4 === this.board.cell5 && this.board.cell4 === this.board.cell6) {
            return this.board.cell4;
        }
        if (this.board.cell7 === this.board.cell8 && this.board.cell7 === this.board.cell9) {
            return this.board.cell7;
        }
    }

    private vertical(): string {
        if (this.board.cell1 === this.board.cell4 && this.board.cell1 === this.board.cell7) {
            return this.board.cell1;
        }
        if (this.board.cell2 === this.board.cell5 && this.board.cell2 === this.board.cell8) {
            return this.board.cell2;
        }
        if (this.board.cell3 === this.board.cell6 && this.board.cell3 === this.board.cell9) {
            return this.board.cell3;
        }
    }

    private diagonal(): string {
        if (this.board.cell1 === this.board.cell5 && this.board.cell1 === this.board.cell9) {
            return this.board.cell1;
        }
        if (this.board.cell3 === this.board.cell5 && this.board.cell3 === this.board.cell7) {
            return this.board.cell3;
        }
    }

}
