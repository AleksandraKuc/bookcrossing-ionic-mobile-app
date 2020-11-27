import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MessageDefinition} from '../models/message-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {}

  getConversationByUsers(recipient: string): Observable<any> {
    const username = this.tokenStorage.getUsername();
    return this.http.get(`${environment.apiUrl}/conversation/byUsers/${username}/${recipient}`);
  }

  sendMessage(message: MessageDefinition): Observable<any> {
    return this.http.post(`${environment.apiUrl}/message/create`, message);
  }

  createConversation(recipientName: string): Observable<any> {
    const username = this.tokenStorage.getUsername();
    return this.http.post(`${environment.apiUrl}/conversation/create/${username}/${recipientName}`, null);
  }

  checkIfExists(recipientName: string): Observable<any> {
    const username = this.tokenStorage.getUsername();
    return this.http.get(`${environment.apiUrl}/conversation/exists/${username}/${recipientName}`);
  }
}
