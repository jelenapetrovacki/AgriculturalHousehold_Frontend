import { VakcinaPoSvinji } from './../models/vakcina_po_svinji';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BROJ_VAKCINA_URL, VAKCINA_PO_SVINJI_URL, VAKCINE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VakcineService {
  
  constructor(private httpClient: HttpClient) { }

  public getVakcinePoSvinji(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${VAKCINA_PO_SVINJI_URL}/${tetovir_broj_svinje}`);
  }

  public getBrojVakcinaPoSvinji(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${BROJ_VAKCINA_URL}/${tetovir_broj_svinje}`);
  }

  public getVakcine(): Observable<any> {
    return this.httpClient.get(`${VAKCINE_URL}`);
  }

  public postVakcinePoSvinji(vakcinaPoSvinji: VakcinaPoSvinji): Observable<any> {
    return this.httpClient.post(`${VAKCINA_PO_SVINJI_URL}`, vakcinaPoSvinji);
  }
}
