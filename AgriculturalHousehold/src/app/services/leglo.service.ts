import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LEGLO_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LegloService {
  constructor(private httpClient: HttpClient) { }

  public getLeglo(oznakaLegla: string): Observable<any> {
    return this.httpClient.get(`${LEGLO_URL}/${oznakaLegla}`);
  }
}
