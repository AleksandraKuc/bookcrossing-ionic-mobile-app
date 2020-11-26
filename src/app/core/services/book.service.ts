import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = 'http://localhost:8080/api/book';
  private favBooksUrl = 'http://localhost:8080/api/favouriteBooks';
  private historyUserUrl = 'http://localhost:8080/api/historyUsers';

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }

  getBook(idBook: any): Observable<any> {
    return this.http.get(`${this.bookUrl}/id/${idBook}`);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.bookUrl}/all`);
  }

  getByTitle(title: string, username = null): Observable<any> {
    return this.http.get(`${this.bookUrl}/title/${title}/${username}`);
  }

  getByCategory(category: string, username = null): Observable<any> {
    return this.http.get(`${this.bookUrl}/category/${category}/${username}`);
  }

  getByTitleAndCategory(title: string, category: string, username = null): Observable<any> {
    return this.http.get(`${this.bookUrl}/title&category/${title}/${category}/${username}`);
  }

  getUserOwnedBooks(username?: string): Observable<any> {
    username = username ? username : this.tokenStorage.retrieveUsername();
    return this.http.get(`${this.bookUrl}/user/${username}`);
  }

  getUserAddedBooks(username?: string): Observable<any> {
    username = username ? username : this.tokenStorage.retrieveUsername();
    return this.http.get(`${this.bookUrl}/addedByUser/${username}`);
  }

  getFavBooks(): Observable<any> {
    const username = this.tokenStorage.retrieveUsername();
    return this.http.get(`${this.bookUrl}/fav/${username}`);
  }

  uploadImage(image: any): Observable<any> {
    return this.http.post(`${this.bookUrl}/upload`, image);
  }

  createBook(book: any): Observable<any> {
    const username = this.tokenStorage.retrieveUsername();
    return this.http.post(`${this.bookUrl}/create/${username}`, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put(`${this.bookUrl}/update`, book);
  }

  updateBookHired(idBook: number, username: string): Observable<any> {
    return this.http.put(`${this.historyUserUrl}/update/${idBook}/${username}`, null);
  }

  deleteBook(idBook: number): Observable<any> {
    return this.http.delete(`${this.bookUrl}/${idBook}`);
  }

  addToFavourites(idBook: number): Observable<any> {
    const username = this.tokenStorage.retrieveUsername();
    return this.http.post(`${this.favBooksUrl}/create/${username}/${idBook}`, null);
  }

  removeFromFavourites(idBook: number): Observable<any> {
    const username = this.tokenStorage.retrieveUsername();
    return this.http.delete(`${this.favBooksUrl}/delete/${username}/${idBook}`);
  }

  checkIfFavourite(idBook: number): Observable<any> {
    const username = this.tokenStorage.retrieveUsername();
    return this.http.get(`${this.favBooksUrl}/check/${username}/${idBook}`);
  }
}
