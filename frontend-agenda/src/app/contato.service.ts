
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  baseURL = 'http://localhost:8080';

  getContacts(userId): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.baseURL + '/meusCompromissos/'  + userId);
  }

  getContact(id: string): Observable<Contact>{
    return this.http.get<Contact>(this.baseURL + '/selecionarCompromisso/' + id);
  }

  addContact(contact: {id: number, nome: string, email: string, telefone: string, endereco: string, user_id: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('id', String(contact.id));
    body = body.set('nome', contact.nome);
    body = body.set('email', contact.email);
    body = body.set('telefone', contact.telefone);
    body = body.set('endereco', contact.endereco);
    body = body.set('user_id', String(contact.user_id));
    return this.http.post(this.baseURL, body, {observe: 'response'});
  }

  updateContact(contact: {id: number, nome: string, email: string, telefone: string, endereco: string, user_id: number}, id: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('id', String(contact.id));
    body = body.set('nome', contact.nome);
    body = body.set('email', contact.email);
    body = body.set('telefone', contact.telefone);
    body = body.set('endereco', contact.endereco);
    body = body.set('user_id', String(contact.user_id));
    return this.http.put(this.baseURL + '/selecionarCompromisso/' + id, body, {observe: 'response'});
  }

  deleteContact(id: string): Observable<any>{
    return this.http.delete(this.baseURL + '/selecionarCompromisso/' + id, {observe: 'response'});
  }

  constructor(private http: HttpClient) { }

}
