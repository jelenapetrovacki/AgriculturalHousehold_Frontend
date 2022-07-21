import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UPLATA_URL } from '../app.constants';
import { Uplata } from '../models/uplata';

@Injectable({
  providedIn: 'root'
})
export class UplataService {

  constructor(private httpClient: HttpClient) { }

  public getUplataZaFakturaID(idFaktura: number): Observable<any> {
    return this.httpClient.get(`${UPLATA_URL}/${idFaktura}`);
  }

  public addUplata(uplata: Uplata): Observable<any> {
    uplata.id = 350;
    return this.httpClient.post(`${UPLATA_URL}`, uplata);
  }

  public deleteUplata(id: number): Observable<any> {
    return this.httpClient.delete(`${UPLATA_URL}/${id}`);
  }
}
