import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { ContatoService } from '../contato.service';
import { LoginService } from '../login.service';
import { UsuarioService } from '../usuario.service';
import { User } from '../models/User';
// import { userId } from '../usuario.service'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  contactList: Contact[] = [];

  usuarioId = sessionStorage.getItem('usuarioId');
  usuarioNome = sessionStorage.getItem('usuarioNome');
  usuarioToken = sessionStorage.getItem('usuarioToken');

  loadContacts(): void {
    this.contactService.getContacts(this.usuarioId).subscribe( res => {
      this.contactList = res;
    });
  }

  selectContact(contact: Contact): void{
    location.assign('/selectedContact/' + contact.id);
  }

  constructor(private contactService: ContatoService, private userService: UsuarioService) { }

  ngOnInit(): void {
    console.log(this.usuarioId);
    this.loadContacts();
  }

}
