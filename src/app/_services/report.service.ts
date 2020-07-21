import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportUrl: string = '/api/report'

  constructor(
    private http: HttpClient
  ) { }

  createReport(entityType, report): Observable<any> {
    return this.http.post(`${this.reportUrl}/${entityType}`, report);
  }

  getEntitiesWithReports(entities: string): Observable<any> {
    return this.http.get(`${this.reportUrl}/${entities}`);
  }

  checkReport(reportId: number, entityType: string): Observable<any> {
    return this.http.patch(`${this.reportUrl}/check/${entityType}/${reportId}`, null);
  }
}
