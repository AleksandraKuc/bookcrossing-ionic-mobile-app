import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {Observable} from 'rxjs';
import {UserDefinition} from '../models/user-definition.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {}

  getUser(username?: any): Observable<any> {
    username = username ? username : this.tokenStorage.retrieveUsername();
    return this.http.get<UserDefinition>(`${environment.apiUrl}/user/username/${username}`);
  }

  getUserById(id: number): Observable<any> {
    return  this.http.get(`${environment.apiUrl}/user/id/${id}`);
  }

  getAllUsers(filterResults: boolean): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/all/${filterResults}`);
  }

  getAllByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/all/username/${username}`);
  }

  getBooksByUser(idUser: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/getBooksByUser/${idUser}`);
  }

  deleteAccount(username?: string): Observable<any> {
    const user = username ? username : this.tokenStorage.retrieveUsername();
    return this.http.delete(`${environment.apiUrl}/user/${user}`);
  }
}
