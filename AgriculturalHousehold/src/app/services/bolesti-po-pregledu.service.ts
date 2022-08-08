import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOLESTI_PO_PREGLEDU_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class BolestiPoPregleduService {

  constructor(private httpClient: HttpClient) { }

  public getBolestiPoPregledu(sifraPregleda: number): Observable<any> {
    return this.httpClient.get(`${BOLESTI_PO_PREGLEDU_URL}/${sifraPregleda}`);
  }
}
