import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TERAPIJE_PO_DANU_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TerapijeService {

  constructor(private httpClient: HttpClient) { }

  public getTerapijePoDanu(): Observable<any> {
    return this.httpClient.get(`${TERAPIJE_PO_DANU_URL}`);
  }
}
