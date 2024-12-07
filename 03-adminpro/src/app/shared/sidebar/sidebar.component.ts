import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  public usuario!: Usuario;

  private usuarioService = inject(UsuarioService);

  constructor() {
    this.usuario = this.usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logout();
  }
}
