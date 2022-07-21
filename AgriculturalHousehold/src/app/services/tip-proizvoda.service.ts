import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIP_PROIZVODA_URL } from '../app.constants';
import { TipProizvoda } from '../models/tip_proizvoda';

@Injectable({
  providedIn: 'root'
})
export class TipProizvodaService {

  constructor(private httpClient: HttpClient) { }

  public getTipoviProizvoda(): Observable<any> {
    return this.httpClient.get(`${TIP_PROIZVODA_URL}`);
  }

  public addTipProizvoda(tipProizvoda: TipProizvoda): Observable<any> {
    tipProizvoda.id = 350;
    return this.httpClient.post(`${TIP_PROIZVODA_URL}`, tipProizvoda);
  }

  public updateTipProizvoda(tipProizvoda: TipProizvoda): Observable<any> {
    return this.httpClient.put(`${TIP_PROIZVODA_URL}`, tipProizvoda);
  }
}
