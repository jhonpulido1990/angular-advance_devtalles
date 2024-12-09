import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItem!: any[];
  public usuario!: Usuario;
  private sidebarService = inject(SidebarService);

  private usuarioService = inject(UsuarioService);

  constructor() {
    this.usuario = this.usuarioService.usuario;
    this.menuItem = this.sidebarService.menu;
  }

  logOut() {
    this.usuarioService.logout();
  }
}
