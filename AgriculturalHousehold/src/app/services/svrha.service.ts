import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SVRHA_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SvrhaService {

  constructor(private httpClient: HttpClient) { }

  public getSvrhe(): Observable<any> {
    return this.httpClient.get(`${SVRHA_URL}`);
  }
}
