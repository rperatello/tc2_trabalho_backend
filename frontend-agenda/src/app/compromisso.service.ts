import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from './models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  baseURL = environment.baseUrl

  getAppointments(userId): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.baseURL + '/meusCompromissos/'  + userId, {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('usuarioToken')}`
      }})
  }

  constructor(private http: HttpClient) { }
}
