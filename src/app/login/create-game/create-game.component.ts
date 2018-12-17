import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from '../login.service';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

    newGameForm: FormGroup;

    constructor(private loginService: LoginService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.newGameForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.loginService.create(this.newGameForm.value);
        for (const name of Object.keys(this.newGameForm.controls)) {
            this.newGameForm.controls[name].reset();
            this.newGameForm.controls[name].setErrors(null);
        }
        // this.loginService.setTabIndex(1);
    }

}
