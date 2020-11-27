import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorage: TokenStorageService,
              private alertCtrl: AlertController) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const username = this.tokenStorage.getUsername();
    if (username) {
      return true;
    }

    this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not allowed to access to that page, please log in or register new account.',
      buttons: ['OK']
    }).then(alert => alert.present());

    this.router.navigate(['/navigation/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
