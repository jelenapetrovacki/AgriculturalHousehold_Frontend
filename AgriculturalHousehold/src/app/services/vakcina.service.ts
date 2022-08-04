import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VAKCINE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VakcineService {
  
  constructor(private httpClient: HttpClient) { }

  public getVakcinePoSvinji(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${VAKCINE_URL}/${tetovir_broj_svinje}`);
  }
}
