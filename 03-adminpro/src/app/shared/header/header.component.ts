import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  public usuario!: Usuario;

  private usuarioService = inject(UsuarioService);

  constructor() {
    this.usuario = this.usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logout();
  }
}
