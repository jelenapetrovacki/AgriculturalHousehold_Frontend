import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NEFAKT_STAVKE_BY_NARUDZBINAID_URL, STAVKA_URL, STAVKE_BY_FAKTURAID_URL, STAVKE_BY_NARUDZBINAID_URL, STAVKE_URL } from '../app.constants';
import { Stavka } from '../models/stavka';

@Injectable({
  providedIn: 'root'
})
export class StavkaService {

  constructor(private httpClient: HttpClient) { }

  public getStavke(): Observable<any> {
    return this.httpClient.get(`${STAVKA_URL}`);
  }

  public getStavkeZaNarudzbinaID(idNarudzbina: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_BY_NARUDZBINAID_URL}/${idNarudzbina}`);
  }

  public getNefakturisaneStavkeZaNarudzbinaID(idNarudzbina: number): Observable<any> {
    return this.httpClient.get(`${NEFAKT_STAVKE_BY_NARUDZBINAID_URL}/${idNarudzbina}`);
  }

  public getStavkeZaFakturaID(idFaktura: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_BY_FAKTURAID_URL}/${idFaktura}`);
  }

  public addStavka(stavka: Stavka): Observable<any> {
    stavka.id = 350;
    return this.httpClient.post(`${STAVKA_URL}`, stavka);
  }

  public updateStavka(stavka: Stavka): Observable<any> {
    return this.httpClient.put(`${STAVKA_URL}`, stavka);
  }

  public updateStavke(stavke: Stavka[]): Observable<any> {
    return this.httpClient.put(`${STAVKE_URL}`, stavke);
  }
  
  public deleteStavka(id: number): Observable<any> {
    return this.httpClient.delete(`${STAVKA_URL}/${id}`);
  }
}
