import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {IGameData} from '../login.interfaces';
import {LoginService} from '../login.service';

@Component({
    selector: 'app-login-pass-modal',
    templateUrl: './login-pass-modal.component.html',
    styleUrls: ['./login-pass-modal.component.css']
})
export class LoginPassModalComponent implements OnInit {

    private password = '';

    constructor(public dialogRef: MatDialogRef<LoginPassModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IGameData,
                private loginService: LoginService) {
    }

    ngOnInit() {
        console.log(this.data);
    }

    joinGame(): void {
        this.loginService.join({id: this.data._id, password: this.password});
        this.dialogRef.close();
    }

}
