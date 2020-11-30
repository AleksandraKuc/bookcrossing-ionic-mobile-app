import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SearchParamsInfo } from '../../shared/models/searchParams-info';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UserDefinition } from '../models/user-definition.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {}

  getUser(username?: any): Observable<any> {
    username = username ? username : this.tokenStorage.getUsername();
    return this.http.get<UserDefinition>(`${environment.apiUrl}/user/username/${username}`);
  }

  getUserById(id: number): Observable<any> {
    return  this.http.get(`${environment.apiUrl}/user/id/${id}`);
  }

  getAllUsers(searchParams: SearchParamsInfo): Observable<any> {
    const params = new HttpParams()
        .set('filterResults', String(searchParams.filterUserResults))
        .set('username', searchParams.username)
        .set('maxResults', String(searchParams.maxResults))
        .set('page', String(searchParams.page));
    return this.http.get(`${environment.apiUrl}/user/all`, {params});
  }

  getBooksByUser(idUser: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/getBooksByUser/${idUser}`);
  }

  deleteAccount(username?: string): Observable<any> {
    const user = username ? username : this.tokenStorage.getUsername();
    return this.http.delete(`${environment.apiUrl}/user/${user}`);
  }
}
