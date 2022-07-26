import { NARUDZBINA_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Narudzbina } from '../models/narudzbina';

@Injectable({
  providedIn: 'root'
})
export class NarudzbinaService {

  constructor(private httpClient: HttpClient) { }

  public getNarudzbine(): Observable<any> {
    return this.httpClient.get(`${NARUDZBINA_URL}`);
  }


  public addNarudzbina(narudzbina: Narudzbina): Observable<any> {
    narudzbina.id = 350;
    return this.httpClient.post(`${NARUDZBINA_URL}`, narudzbina);
  }

  public updateNarudzbina(narudzbina: Narudzbina): Observable<any> {
    return this.httpClient.put(`${NARUDZBINA_URL}`, narudzbina);
  }
  
  public deleteNarudzbina(id: number): Observable<any> {
    return this.httpClient.delete(`${NARUDZBINA_URL}/${id}`);
  }
}
