import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {

  constructor(protected tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  get isLogged(): boolean {
    return !!this.tokenStorage.getUsername();
  }
}
