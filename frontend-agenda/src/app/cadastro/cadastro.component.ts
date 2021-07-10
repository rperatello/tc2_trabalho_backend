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
    erros.length > 0 ? alert(erros) : this.userService.addUser(this.userRegisterForm.value).subscribe(
      (res) => {
        console.log('res :>> ', JSON.stringify(res));
          alert(res.data)
        location.assign('/');
      },
      (error) => {
        if(error.status == 200){
          console.log('res error:>> ', JSON.stringify(error));
          if(error.ok)
            alert(error.message)
          else
            alert(error.error.text)
          location.assign('/');
        }
        console.log('error :>> ', error);
        if(error.status != 200){
          if(typeof(error.error) == 'string'){
            console.log('error text :>> ', error.error);
            alert(error.error)
          }
          else
            error.error.forEach(x => {
              console.log('error list :>> ', x.msg);
              alert(x.msg)
            })
            this.initForm();
        }
      })
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
