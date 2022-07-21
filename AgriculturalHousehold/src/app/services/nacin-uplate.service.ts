import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NACIN_UPLATE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class NacinUplateService {

  constructor(private httpClient: HttpClient) { }

  public getNaciniUplate(): Observable<any> {
    return this.httpClient.get(`${NACIN_UPLATE_URL}`);
  }
}
