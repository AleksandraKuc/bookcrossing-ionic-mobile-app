import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { AuthLoginInfo } from '../../shared/models/login-info';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    credentials = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService,
                private tokenStorage: TokenStorageService,
                private router: Router,
                private alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    login() {
        const loginInfo = new AuthLoginInfo(
            this.credentials.get('username').value,
            this.credentials.get('password').value);

        this.authService.attemptAuth(loginInfo).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);

                this.router.navigate(['/']);
            },
            () => {
                this.alertCtrl.create({
                    header: 'Login failed',
                    message: 'Wrong credentials. Please check entered username and password',
                    buttons: ['OK']
                }).then(alert => alert.present());
            }
        );
    }

    controlValid(name: string): boolean {
        return this.credentials.get(name).hasError('required') &&
            (this.credentials.get(name).touched ||
                this.credentials.get(name).dirty);
    }

}
