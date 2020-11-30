import { Component, OnInit } from '@angular/core';

import { SearchParamsInfo } from '../../shared/models/searchParams-info';
import { UserDefinition } from '../../core/models/user-definition.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users: UserDefinition[];
  searchUsername = '';

  isLoading = true;

  maxResults = 8;
  page = 0;
  maxPage: number;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.page = 0;
    this.maxPage = null;
    this.users = [];

    this.searchChanged();
  }

  searchChanged(event?){
    const searchParams = new SearchParamsInfo();
    searchParams.setUserValues(true, this.searchUsername, this.maxResults, this.page);
    this.userService.getAllUsers(searchParams).subscribe(
        res => {
          this.users = this.users.concat(res.users);
          this.isLoading = false;

          if (!this.maxPage) {
            this.maxPage = Math.ceil(res.amountAll / this.maxResults) - 1;
          }

          if (event) {
            event.target.complete();
          }
        }
    );
  }

  detailsLink(username: string): string {
    return `user-details/${username}`;
  }

  clearList() {
    this.users = [];
    this.page = 0;
    this.maxPage = null;
  }

  loadMore(event) {
    this.page++;
    this.searchChanged(event);
    if (this.page === this.maxPage) {
      event.target.disabled = true;
    }
  }
}
