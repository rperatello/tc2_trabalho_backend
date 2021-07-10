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

  loadAppointment(): void {
    /* this.contactService.getContacts(userId).subscribe( res => {
      this.contactList = res;
    }); */
  }

  selectContact(appointment: Appointment): void{
    location.assign('/selectedAppointment/' + appointment.id);
  }

  constructor(private appointmentService: CompromissoService) { }

  ngOnInit(): void {
    this.loadAppointment();
  }

}
