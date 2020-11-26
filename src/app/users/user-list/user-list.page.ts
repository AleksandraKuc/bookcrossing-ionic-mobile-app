import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDefinition} from '../../core/models/user-definition.model';
import {UserService} from '../../core/services/user.service';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users: Observable<UserDefinition[]>;
  searchUsername = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getAllUsers(true);
  }

  searchChanged(){
    if (this.searchUsername !== '') {
      this.users = this.userService.getAllByUsername(this.searchUsername);
    } else {
      this.users = this.userService.getAllUsers(true);
    }
  }

  detailsLink(username: string): string {
    return `user-details/${username}`;
  }
}
