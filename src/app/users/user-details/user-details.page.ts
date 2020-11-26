import { Component, OnInit } from '@angular/core';
import {UserDefinition} from '../../core/models/user-definition.model';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage {

  details: UserDefinition;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ionViewWillEnter() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(result => {
      this.details = result;
    });
  }

  isProfileView(): boolean {
    return this.details.username === this.tokenStorage.retrieveUsername();
  }

  get buttonText(): string {
    if (this.isProfileView()) {
      return 'Show my books';
    }
    return 'Show user\'s books';
  }

  showUsersBooks(): void {
    this.router.navigate(['navigation/books/user-books'], { state: { username: this.details.username }});
  }
}
