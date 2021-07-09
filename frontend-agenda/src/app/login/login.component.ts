import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm : FormGroup;

  login() : void{
    this.onSubmit();
  }

  onSubmit(): void{
    //Precisa criar a lógica de login e venv com o id do usuário;
    console.log(this.userLoginForm.value);
  }

  initForm(): void{
    this.userLoginForm = new FormGroup ({
      login: new FormControl(null, Validators.required),
      senha: new FormControl (null, Validators.required),
    });
  }

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.initForm();
  }

}
