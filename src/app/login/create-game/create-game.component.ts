import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {IGameData} from '../login.interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-game',
    templateUrl: './create-game.component.html',
    styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

    newGameForm: FormGroup;

    constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.newGameForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.loginService.create(this.newGameForm.value)
            .subscribe((gameData: IGameData) => {
                console.log(gameData);
            });
    }

}
