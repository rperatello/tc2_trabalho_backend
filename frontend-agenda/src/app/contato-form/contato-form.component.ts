import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {

  contatoForm: FormGroup;
  selectedId: string;
  selecionaContatoById: Contact;
  usuarioId = sessionStorage.getItem('usuarioId');
  usuarioToken = sessionStorage.getItem('usuarioToken');

  novoContato(): void{
    if (this.contatoForm.valid){
      this.contatoService.addContact(this.contatoForm.value).subscribe( res => {
        res.ok ? alert ('Contato cadastrado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/contatos');
      });
    } else {
      alert('Falha ao cadastrar contato')
    }
  }

  alterarContato(): void{
    console.log(this.contatoForm)
    if (this.contatoForm.valid){
      this.contatoService.updateContact(this.contatoForm.value).subscribe( res => {
        res.ok ? alert ('Contato alterado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/contatos');
      });
    } else {
      alert('Falha ao alterar o contato')
    }
  }

  onSubmit(): void{
  }

  initForm(): void{
    this.contatoForm = new FormGroup ({
      id: new FormControl(null),
      nome: new FormControl(null, Validators.required),
      email: new FormControl (null, Validators.required),
      telefone: new FormControl (null, Validators.required),
      endereco: new FormControl(null, Validators.required),
    });
  }

  constructor(private contatoService: ContatoService, public router: Router) { }

  ngOnInit(): void {
    if (!this.usuarioToken || !this.usuarioId){
      location.assign('');
    }
    this.initForm();
  }

}
