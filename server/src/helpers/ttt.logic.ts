import {IBoard} from '../interfaces/iBoard';

export class TttLogic {

    private board: IBoard = {};
    constructor() {}

    public checkIfWin(board): string {
        this.board = Object.assign(this.board, JSON.parse(board));
        if (this.horizontal()) {
            return this.horizontal();
        }
        if (this.vertical()) {
            return this.vertical();
        }
        if (this.diagonal()) {
            return this.diagonal();
        }
        return '';
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
