import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseURL = 'localhost:8080';

  addUser(user: {nome: string, login: string, senha: string, admin: number}): void {
    alert(user.login)
  }

  /* addUser(user: {nome: string, login: string, senha: string, admin: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('nome', user.nome);
    body = body.set('login', user.login);
    body = body.set('senha', user.senha);
    body = body.set('admin', String(user.admin));
    return this.http.post(this.baseURL + '/adicionarUsuario', body, {observe: 'response'});
  } */

  constructor() { }
}
