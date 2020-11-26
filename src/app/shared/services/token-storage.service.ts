import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private storage: Storage,
              private plt: Platform,
              private http: HttpClientModule,
              private router: Router) { }

  signOut() {
    this.storage.clear().then(() => {
      this.router.navigate(['/']);
    });
  }

  public saveToken(token: string) {
    this.storage.set(TOKEN_KEY, token);
  }

  public getToken(): Promise<any> {
    return this.storage.get(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    this.storage.set(USERNAME_KEY, username);
  }

  public getUsername(): Promise<any> {
    return this.storage.get(USERNAME_KEY);
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }

  isLogged() {
    return this.getUsername().then( value => {
      return !!value;
    });
  }

  retrieveUsername(): string | null {
    let username: string;
    this.getUsername().then(value => {username = value;});
    return username;
  }
}
