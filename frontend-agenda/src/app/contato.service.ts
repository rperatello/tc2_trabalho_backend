
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './models/Contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  baseURL = environment.baseUrl

  getContacts(userId): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.baseURL + '/meusContatos/'  + userId, {
      headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('usuarioToken')}`
      }})
  }

  getContact(id: string): Observable<Contact>{
    return this.http.get<Contact>(this.baseURL + '/selecionarContato/' + id);
  }

  addContact(contact: {id: number, nome: string, email: string, telefone: string, endereco: string, user_id: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('id', String(contact.id));
    body = body.set('nome', contact.nome);
    body = body.set('email', contact.email);
    body = body.set('telefone', contact.telefone);
    body = body.set('endereco', contact.endereco);
    body = body.set('user_id', String(contact.user_id));
    return this.http.post(this.baseURL + '/adicionarContato', body, {observe: 'response'});
  }

  updateContact(contact: {id: number, nome: string, email: string, telefone: string, endereco: string, user_id: number}, id: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('id', String(contact.id));
    body = body.set('nome', contact.nome);
    body = body.set('email', contact.email);
    body = body.set('telefone', contact.telefone);
    body = body.set('endereco', contact.endereco);
    body = body.set('user_id', String(contact.user_id));
    return this.http.put(this.baseURL + '/selecionarContato/' + id, body, {observe: 'response'});
  }

  deleteContact(id: string): Observable<any>{
    return this.http.delete(this.baseURL + '/selecionarContato/' + id, {observe: 'response'});
  }

  constructor(private http: HttpClient) { }

}
