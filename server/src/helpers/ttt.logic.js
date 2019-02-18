"use strict";
exports.__esModule = true;
var TttLogic = /** @class */ (function () {
    function TttLogic() {
    }
    TttLogic.prototype.checkIfWin = function (board) {
        this.board = board;
        var res = {
            board: board,
            winner: ''
        };
        if (this.horizontal()) {
            res.winner = this.horizontal();
        }
        else if (this.vertical()) {
            res.winner = this.vertical();
        }
        else if (this.diagonal()) {
            res.winner = this.diagonal();
        }
        return res;
    };
    TttLogic.prototype.horizontal = function () {
        if (this.board.cell1 === this.board.cell2 && this.board.cell1 === this.board.cell3) {
            return this.board.cell1;
        }
        if (this.board.cell4 === this.board.cell5 && this.board.cell4 === this.board.cell6) {
            return this.board.cell4;
        }
        if (this.board.cell7 === this.board.cell8 && this.board.cell7 === this.board.cell9) {
            return this.board.cell7;
        }
    };
    TttLogic.prototype.vertical = function () {
        if (this.board.cell1 === this.board.cell4 && this.board.cell1 === this.board.cell7) {
            return this.board.cell1;
        }
        if (this.board.cell2 === this.board.cell5 && this.board.cell2 === this.board.cell8) {
            return this.board.cell2;
        }
        if (this.board.cell3 === this.board.cell6 && this.board.cell3 === this.board.cell9) {
            return this.board.cell3;
        }
    };
    TttLogic.prototype.diagonal = function () {
        if (this.board.cell1 === this.board.cell5 && this.board.cell1 === this.board.cell9) {
            return this.board.cell1;
        }
        if (this.board.cell3 === this.board.cell5 && this.board.cell3 === this.board.cell7) {
            return this.board.cell3;
        }
    };
    return TttLogic;
}());
exports.TttLogic = TttLogic;
