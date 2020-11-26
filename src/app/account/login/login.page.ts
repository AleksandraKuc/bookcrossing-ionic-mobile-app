import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLoginInfo } from '../../shared/models/login-info';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginInfo: AuthLoginInfo;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  registerMessage = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              protected router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
    );
  }

}
