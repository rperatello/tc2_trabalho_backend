import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component'
import { CompromissoComponent } from './compromisso/compromisso.component';
import { ContatoFormComponent } from './contato-form/contato-form.component';
import { CompromissoFormComponent } from './compromisso-form/compromisso-form.component';
// import { CadastrarContatoComponent } from './contato-form/contato-form.component'

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'userRegistration', component: CadastroComponent},
  { path: 'contatos', component: ContatoComponent},
  { path: 'cadastrarContato', component: ContatoFormComponent},
  { path: 'alterarContato', component: ContatoFormComponent},
  { path: 'compromissos', component: CompromissoComponent},
  { path: 'cadastrarCompromisso', component: CompromissoFormComponent},
  { path: 'alterarCompromisso', component: CompromissoFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
