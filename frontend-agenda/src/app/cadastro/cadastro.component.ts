import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  userRegisterForm: FormGroup;

  onSubmit(): void {
    var erros: string[] = [];
    if (!this.userRegisterForm.valid) {
      erros.push("Preencha todos os campos do fomulário");
    }
    if (this.userRegisterForm.value.senha !== this.userRegisterForm.value.confirmaSenha) {
      erros.push("Senhas não conferem");
    }
    //Precisa criar a lógica de cadastro do usuário;
    erros.length > 0 ? alert(erros) : this.userService.addUser(this.userRegisterForm.value);
    // Isso pode ajudar
    /* this.userService.addUser(this.userRegisterForm.value).subscribe(res => {
      res.ok ? alert('Usuário Cadastrado com Sucesso.') : alert('Falha ao Acessar Banco de Dados.');
      location.assign('');
    }); */
  }

  initForm(): void {
    this.userRegisterForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
      confirmaSenha: new FormControl(null, Validators.required),
      admin: new FormControl(0)
    });
  }

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.initForm();
  }

}
