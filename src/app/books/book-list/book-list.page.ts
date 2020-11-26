import { Component } from '@angular/core';
import {Observable} from 'rxjs';

import { BookDefinition } from '../../core/models/book-definition.model';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage {

  books: Observable<BookDefinition[]>;
  searchTitle = '';
  searchType = '';
  username: string;

  categories: string[] = ['Biography', 'ChildrenBook', 'Guide', 'PopularScience', 'Thriller', 'Novel', 'Poetry', 'History', 'Romance', 'Education', 'Scientific', 'Adventure', 'Criminal', 'Humour', 'Science_fiction', 'Other'];

  constructor(private bookService: BookService) {}

  ionViewWillEnter() {
    this.username = history.state.username;
    this.searching();
  }

  searching() {
    if (this.username) {
      this.userSearchChanged();
    } else {
      this.searchChanged();
    }
  }

  userSearchChanged() {
    if (this.searchTitle !== '' && this.searchType !== '') {
      this.books = this.bookService.getByTitleAndCategory(this.searchTitle, this.searchType, this.username);
    } else if (this.searchTitle !== '') {
      this.books = this.bookService.getByTitle(this.searchTitle, this.username);
    } else if (this.searchType !== '') {
      this.books = this.bookService.getByCategory(this.searchType, this.username);
    } else {
      this.books = this.bookService.getUserOwnedBooks(this.username);
    }
  }

  searchChanged(){
    if (this.searchTitle !== '' && this.searchType !== '') {
      this.books = this.bookService.getByTitleAndCategory(this.searchTitle, this.searchType);
    } else if (this.searchTitle !== '') {
      this.books = this.bookService.getByTitle(this.searchTitle);
    } else if (this.searchType !== '') {
      this.books = this.bookService.getByCategory(this.searchType);
    } else {
      this.books = this.bookService.getAllBooks();
    }
  }

  detailsLink(id: number): string {
    return `/navigation/books/book-details/${id}`;
  }

  get title(): string {
    if (this.username) {
      return `${this.username} books`;
    }
    return 'All books';
  }

  get defaultHref(): string {
    return `navigation/users/user-details/${this.username}`;
  }
}
