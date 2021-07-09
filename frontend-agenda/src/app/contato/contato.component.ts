import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { ContatoService } from '../contato.service';
// import { userId } from '../usuario.service'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  contactList: Contact[] = [];

  loadContacts(): void {
    this.contactService.getContacts(userId).subscribe( res => {
      this.contactList = res;
    });
  }

  selectContact(contact: Contact): void{
    location.assign('/selectedContact/' + contact.id);
  }

  constructor(private contactService: ContatoService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

}
