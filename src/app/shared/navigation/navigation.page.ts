import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable, of } from 'rxjs';

import { BookAddModifyPage } from '../../books/book-add-modify/book-add-modify.page';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  constructor(protected tokenStorage: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public modalController: ModalController) { }

  ngOnInit() {
  }

  get isLogged(): boolean {
    return !!this.tokenStorage.getUsername();
  }

  get bookDetailsView(): Observable<any> {
    return of(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  logOut(): void {
    this.tokenStorage.logOut();
  }

  async createBook() {
    const url = this.router.routerState.snapshot.url;
    const modal = await this.modalController.create({
        component: BookAddModifyPage,
        cssClass: 'my-custom-class',
        componentProps: {
          returnUrl: url,
          pageMode: 'add',
        }
      });
    return await modal.present();
  }

}
