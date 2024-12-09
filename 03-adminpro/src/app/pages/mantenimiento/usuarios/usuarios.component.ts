import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``,
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  public totalUsuario = 0;
  public usuario: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalUsuario = resp.total;
      if (resp.usuarios.length !== 0) {
        this.usuario = resp.usuarios;
      }
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuario) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'NO puede borrarse a si mismo');
      return;
    }
    Swal.fire({
      title: 'Borrar usuario?',
      text: `esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          this.cargarUsuarios();
        });
      }
    });
  }

  CambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe( resp => {
      console.log(resp)
    });
  }
}
