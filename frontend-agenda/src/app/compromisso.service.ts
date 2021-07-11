import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from './models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  baseURL = environment.baseUrl
  usuarioId = sessionStorage.getItem('usuarioId');
  usuarioNome = sessionStorage.getItem('usuarioNome');
  usuarioToken = sessionStorage.getItem('usuarioToken');

  getAppointments(userId): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.baseURL + '/meusCompromissos/'  + userId, {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('usuarioToken')}`
      }})
  }

  addAppointments(appointment: { id: number, data: string, endereco: string, observacoes: string, participantes: string, status: string, user_id: number }): Observable<any>{
    let body = new HttpParams();
    body = body.set('data', appointment.data);
    body = body.set('endereco', appointment.endereco);
    body = body.set('observacoes', appointment.observacoes);
    body = body.set('participantes', appointment.participantes);
    body = body.set('status', appointment.status);
    body = body.set('user_id', this.usuarioId);
    return this.http.post(this.baseURL + '/adicionarCompromisso', body, {
      observe: 'response',
      responseType: 'text',
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('usuarioToken')}`
      }
    });
  }

  constructor(private http: HttpClient) { }
}
