import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalTermHTML } from '../rental-term/RentalTermHTML';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getLastRentalTerm(): Observable<RentalTermHTML> {
    return this.http.get<RentalTermHTML>(this.url + '/termo');
  }
}
