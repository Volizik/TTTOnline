import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IGameData} from '../login.interfaces';

@Component({
    selector: 'app-login-pass-modal',
    templateUrl: './login-pass-modal.component.html',
    styleUrls: ['./login-pass-modal.component.css']
})
export class LoginPassModalComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<LoginPassModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IGameData) {

    }

    ngOnInit() {
        console.log(this.data);
    }

}
