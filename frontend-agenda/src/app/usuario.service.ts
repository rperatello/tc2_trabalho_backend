import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  baseURL = environment.baseUrl;

  addUser(user: {nome: string, login: string, senha: string, admin: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('id', null);
    body = body.set('nome', user.nome);
    body = body.set('login', user.login);
    body = body.set('senha', user.senha);
    body = body.set('admin', String(user.admin));
    return this.http.post(this.baseURL + '/adicionarUsuario', body, {observe: 'response'});
  }

  selectUser(id: string): Observable<User>{
    return this.http.get<User>(this.baseURL + '/selecionarUsuario/' + id);
  }

  constructor(private http: HttpClient) { }
}
