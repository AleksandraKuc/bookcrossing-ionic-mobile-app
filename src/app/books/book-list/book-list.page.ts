import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BookDefinition } from '../../core/models/book-definition.model';
import { BookService } from '../../core/services/book.service';
import { SearchParamsInfo } from '../../shared/models/searchParams-info';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage {

  books: BookDefinition[] = [];
  searchTitle = '';
  searchType = '';
  username: string;
  mode = '';

  maxResults = 8;
  page = 0;
  maxPage: number;

  categories: string[] = ['Biography', 'ChildrenBook', 'Guide', 'PopularScience', 'Thriller', 'Novel', 'Poetry', 'History', 'Romance', 'Education', 'Scientific', 'Adventure', 'Criminal', 'Humour', 'Science_fiction', 'Other'];

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {}

  ionViewWillEnter() {
    this.page = 0;
    this.maxPage = null;
    this.books = [];

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

  searching(event?) {
    if (this.mode === 'fav') {
      this.favSearchChanged(event);
    } else {
      this.searchChanged(event);
    }
  }

  favSearchChanged(event?) {
    const searchParams = new SearchParamsInfo();
    searchParams.setBookValues(this.searchTitle, this.searchType, this.maxResults, this.page);
    this.bookService.getFavBooks(searchParams).subscribe(
        res => {
          this.books = this.books.concat(res.books);

          if (!this.maxPage) {
            this.maxPage = Math.ceil(res.amountAll / this.maxResults) - 1;
          }

          if (event) {
            event.target.complete();
          }
        }
    );
  }

  searchChanged(event?){
    const username = this.username ? this.username : null;
    const searchParams = new SearchParamsInfo();
    searchParams.setBookValues(this.searchTitle, this.searchType, this.maxResults, this.page, username);
    this.bookService.getAllBooks(searchParams).subscribe(
        res => {
          this.books = this.books.concat(res.books);

          if (!this.maxPage) {
            this.maxPage = Math.ceil(res.amountAll / this.maxResults) - 1;
          }

          if (event) {
            event.target.complete();
          }
        }
    );
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

  clearList() {
    this.books = [];
    this.page = 0;
    this.maxPage = null;
  }

  loadMore(event) {
    this.page++;
    this.searching(event);
    if (this.page === this.maxPage) {
      event.target.disabled = true;
    }
  }
}
