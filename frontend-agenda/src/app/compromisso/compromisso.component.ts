import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../compromisso.service';
import { Appointment } from '../models/Appointment';

@Component({
  selector: 'app-compromisso',
  templateUrl: './compromisso.component.html',
  styleUrls: ['./compromisso.component.css']
})
export class CompromissoComponent implements OnInit {

  appointmentList: Appointment[] = [];

  usuarioId = sessionStorage.getItem('usuarioId');
  usuarioNome = sessionStorage.getItem('usuarioNome');
  usuarioToken = sessionStorage.getItem('usuarioToken');

  loadAppointments(): void {
    this.appointmentService.getAppointments(this.usuarioId).subscribe( res => {
      this.appointmentList = res;
    });
  }

  selectContact(appointment: Appointment): void{
    location.assign('/selectedAppointment/' + appointment.id);
  }

  constructor(private appointmentService: CompromissoService) { }

  ngOnInit(): void {
    if (!this.usuarioToken || !this.usuarioId){
      location.assign('');
    }
    this.loadAppointments();
  }

}
