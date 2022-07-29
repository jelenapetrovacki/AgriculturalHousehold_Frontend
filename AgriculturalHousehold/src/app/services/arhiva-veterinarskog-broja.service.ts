import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARH_VET_BROJA_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ArhivaVeterinarskogBrojaService {

  constructor(private httpClient: HttpClient) { }

  public getArhivaVeterinarskogBroja(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${ARH_VET_BROJA_URL}/${tetovir_broj_svinje}`);
  }
}
