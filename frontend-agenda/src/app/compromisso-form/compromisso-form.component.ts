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
      id: new FormControl(null),
      data: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      participantes: new FormControl (null, Validators.required),
      endereco: new FormControl (null, Validators.required),
      obs: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }

  novoCompromisso(): void {
    if (this.compromissoForm.valid){
      this.compromissoService.addAppointments(this.compromissoForm.value).subscribe( res => {
        res.ok ? alert ('Compromisso adicionado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/compromissos');
      });
    } else {
      alert('Falha ao cadastrar compromisso')
    }
  }

  alterarCompromisso(): void {
    if (this.compromissoForm.valid){
      this.compromissoService.changeAppointments(this.compromissoForm.value).subscribe( res => {
        res.ok ? alert ('Compromisso alterado com Sucesso.') : alert ('Falha ao Acessar Banco de Dados.');
        location.assign('/alterarCompromisso');
      });
    } else {
      alert('Falha ao alterar compromisso')
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
