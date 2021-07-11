import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm : FormGroup;

  login() : void{
    this.loginService.login(this.userLoginForm.value.login, this.userLoginForm.value.senha).subscribe(
      (res) => {
        alert('Logado com o usuário ' + res.body.nome)
        //console.log(res.body)
        sessionStorage.setItem('usuarioId', res.body.id);
        sessionStorage.setItem('usuarioNome', res.body.nome);
        location.assign('/contatos');
      },
      (error) => {
        alert(error.error.msg)
      })
  }

  onSubmit(): void{
  }

  initForm(): void{
    this.userLoginForm = new FormGroup ({
      login: new FormControl(null, Validators.required),
      senha: new FormControl (null, Validators.required),
    });
  }

  constructor(private userService: UsuarioService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.initForm();
  }

}
