import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  constructor(protected tokenStorage: TokenStorageService,
              private activatedRoute: ActivatedRoute) { }

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
}
