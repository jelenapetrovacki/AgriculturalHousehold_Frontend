import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARH_KATEGORIJA_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class KategorijePoSvinjiService {

  constructor(private httpClient: HttpClient) { }

  public getArhivaKategorijaSvinje(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${ARH_KATEGORIJA_URL}/${tetovir_broj_svinje}`);
  }
}
