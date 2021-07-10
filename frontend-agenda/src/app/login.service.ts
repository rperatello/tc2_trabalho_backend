import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = environment.baseUrl;

  login(login: string, senha: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('login', login);
    body = body.set('senha', senha);
    return this.http.post(this.baseURL + '/login', body, {observe: 'response'});
  }

  constructor(private http: HttpClient) { }
}
