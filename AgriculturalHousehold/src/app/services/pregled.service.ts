import { PREGLEDI_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreglediService {

  constructor(private httpClient: HttpClient) { }

  public getPreglediPoSvinji(tetovir_broj_svinje: string): Observable<any> {
    return this.httpClient.get(`${PREGLEDI_URL}/${tetovir_broj_svinje}`);
  }
}
