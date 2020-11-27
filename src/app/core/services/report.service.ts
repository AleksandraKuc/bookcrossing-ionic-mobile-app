import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {Observable} from 'rxjs';
import {ReportInfo} from '../../shared/models/report-info';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }

  createReport(report: ReportInfo): Observable<any> {
    const username = this.tokenStorage.getUsername();
    report.setReporter(username);
    return this.http.post(`${environment.apiUrl}/report/create`, report);
  }
}
