import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TERAPIJE_PO_PREGLEDU_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TerapijePoPregleduService {

  constructor(private httpClient: HttpClient) { }

  public getTerapijePoPregledu(sifraPregleda: number): Observable<any> {
    return this.httpClient.get(`${TERAPIJE_PO_PREGLEDU_URL}/${sifraPregleda}`);
  }
}
