import { Component } from '@angular/core';
import {Observable} from 'rxjs';

import { BookDefinition } from '../../core/models/book-definition.model';
import { BookService } from '../../core/services/book.service';
import {ActivatedRoute} from '@angular/router';
import {BookSearchParamsInfo} from '../../shared/models/bookSearchParams-info';

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
  mode = '';

  categories: string[] = ['Biography', 'ChildrenBook', 'Guide', 'PopularScience', 'Thriller', 'Novel', 'Poetry', 'History', 'Romance', 'Education', 'Scientific', 'Adventure', 'Criminal', 'Humour', 'Science_fiction', 'Other'];

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {}

  ionViewWillEnter() {
    this.username = history.state.username;
    this.activatedRoute.data.subscribe( data => {
      if (data?.mode) {
        this.mode = data.mode;
      } else {
        this.mode = '';
      }
    });
    this.searching();
  }

  searching() {
    if (this.mode === 'fav') {
      this.favSearchChanged();
    } else {
      this.searchChanged();
    }
  }

  favSearchChanged() {
    const searchParams = new BookSearchParamsInfo(this.searchTitle, this.searchType);
    this.books = this.bookService.getFavBooks(searchParams);
  }

  searchChanged(){
    const username = this.username ? this.username : null;
    const searchParams = new BookSearchParamsInfo(this.searchTitle, this.searchType);
    this.books = this.bookService.getAllBooks(searchParams, username);
  }

  detailsLink(id: number): string {
    return `/navigation/books/book-details/${id}`;
  }

  get title(): string {
    if (this.username) {
      return `${this.username} books`;
    } else if (this.mode === 'fav') {
      return 'Favourite books';
    }
    return 'All books';
  }

  get defaultHref(): string {
    return `navigation/users/user-details/${this.username}`;
  }
}
