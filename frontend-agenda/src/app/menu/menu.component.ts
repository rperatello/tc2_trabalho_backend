import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  logout(): void{
    sessionStorage.clear();
    alert('Usuário deslogado com sucesso!')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
