import { SVINJE_RASA_URL, SVINJE_KATEGORIJA_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SVINJA_URL } from '../app.constants';
import { Svinja } from '../models/svinja';

@Injectable({
  providedIn: 'root'
})
export class SvinjaService {

  constructor(private httpClient: HttpClient) { }

  public getSvinje(): Observable<any> {
    return this.httpClient.get(`${SVINJA_URL}`);
  }

  public getSvinjePoRasi(naziv_rase: string): Observable<any> {
    return this.httpClient.get(`${SVINJE_RASA_URL}/${naziv_rase}`);
  }

  public getSvinjePoKategoriji(sifraKategorije: string): Observable<any> {
    return this.httpClient.get(`${SVINJE_KATEGORIJA_URL}/${sifraKategorije}`);
  }

  public putSvinjePoKategoriji(svinja: Svinja, staraKategorija: string): Observable<any> {
    return this.httpClient.put(`${SVINJA_URL}/${staraKategorija}`, svinja);
  }
}
