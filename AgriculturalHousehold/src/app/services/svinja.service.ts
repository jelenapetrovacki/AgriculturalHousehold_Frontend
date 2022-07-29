import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SVINJA_URL, SVINJE_PO_RASI_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SvinjaService {

  constructor(private httpClient: HttpClient) { }

  public getSvinje(): Observable<any> {
    return this.httpClient.get(`${SVINJA_URL}`);
  }

  public getSvinjePoRasi(oznakaRase: string): Observable<any> {
    return this.httpClient.get(`${SVINJE_PO_RASI_URL}/${oznakaRase}`);
  }
}
