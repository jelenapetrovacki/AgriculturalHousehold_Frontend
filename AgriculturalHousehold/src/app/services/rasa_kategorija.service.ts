import { KATEGORIJE_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RasaKategorijaService {

  constructor(private httpClient: HttpClient) { }

  public getRase(): Observable<any> {
    return this.httpClient.get(`${RASE_URL}`);
  }

  public getKategorija(): Observable<any> {
    return this.httpClient.get(`${KATEGORIJE_URL}`);
  }
}
