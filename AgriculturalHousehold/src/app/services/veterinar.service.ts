import { VETERINARI_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarService {

  constructor(private httpClient: HttpClient) { }

  public getVeterinari(): Observable<any> {
    return this.httpClient.get(`${VETERINARI_URL}`);
  }
}
