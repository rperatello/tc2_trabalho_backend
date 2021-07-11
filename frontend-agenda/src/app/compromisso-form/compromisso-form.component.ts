import { CompromissoService } from './../compromisso.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compromisso-form',
  templateUrl: './compromisso-form.component.html',
  styleUrls: ['./compromisso-form.component.css']
})

export class CompromissoFormComponent implements OnInit {

  compromissoForm: FormGroup;
  usuarioId = sessionStorage.getItem('usuarioId');
  usuarioToken = sessionStorage.getItem('usuarioToken');

  initForm(): void{
    this.compromissoForm = new FormGroup ({
      data: new FormControl(null, Validators.required),
      participantes: new FormControl (null, Validators.required),
      endereco: new FormControl (null, Validators.required),
      obs: new FormControl(null, Validators.required),
    });
  }

  novoCompromisso(): void {
    if (this.compromissoForm.valid){
      this.compromissoService.addAppointments(this.compromissoForm.value).subscribe( res => {
        res.ok ? alert ('Contato cadastrado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/contatos');
      });
    } else {
      alert('Falha ao cadastrar contato')
    }
  }

  onSubmit(): void {

  }

  constructor(public router: Router, private compromissoService: CompromissoService) { }

  ngOnInit(): void {
    if (!this.usuarioToken || !this.usuarioId){
      location.assign('');
    }
    this.initForm();
  }

}
