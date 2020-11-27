import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLoginInfo } from '../../shared/models/login-info';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = {
      username: '',
      password: ''
  };
  // isLoggedIn = false;
  // isLoginFailed = false;
  // errorMessage = '';
  // registerMessage = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() { }

  login() {
    const loginInfo = new AuthLoginInfo(
        this.credentials.username,
        this.credentials.password);

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

}
