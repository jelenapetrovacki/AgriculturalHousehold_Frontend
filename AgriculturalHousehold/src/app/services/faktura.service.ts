import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FAKTURA_BROJ_UPLATA_URL, FAKTURA_URL, FAKTURE_BY_NARUDZBINAID_URL } from '../app.constants';
import { Faktura } from '../models/faktura';

@Injectable({
  providedIn: 'root'
})
export class FakturaService {

  constructor(private httpClient: HttpClient) { }

  public getFakture(): Observable<any> {
    return this.httpClient.get(`${FAKTURA_URL}`);
  }

  public getFaktureZaNarudzbinaID(idNarudzbina: number): Observable<any> {
    return this.httpClient.get(`${FAKTURE_BY_NARUDZBINAID_URL}/${idNarudzbina}`);
  }

  public getBrojUplata(idFaktura: number): Observable<any> {
    return this.httpClient.get(`${FAKTURA_BROJ_UPLATA_URL}/${idFaktura}`);
  }

  public addFaktura(faktura: Faktura): Observable<any> {
    faktura.id = 350;
    return this.httpClient.post(`${FAKTURA_URL}`, faktura);
  }

  public updateFaktura(faktura: Faktura): Observable<any> {
    return this.httpClient.put(`${FAKTURA_URL}`, faktura);
  }

  public deleteFaktura(idFaktura: number): Observable<any> {
    return this.httpClient.delete(`${FAKTURA_URL}/${idFaktura}`);
  }
}
