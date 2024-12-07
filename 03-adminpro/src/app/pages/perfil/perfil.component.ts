import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PerfilForm } from '../../interfaces/perfil-form.interface';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  public fb = inject(FormBuilder);
  public usuario!: Usuario;
  private usuarioService = inject(UsuarioService);

  public perfilForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this.usuario = this.usuarioService.usuario;
    this.perfilForm.reset({nombre: this.usuario.nombre, email: this.usuario.email})
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value as PerfilForm)
      .subscribe( () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre!;
        this.usuario.email = email!;
      });
  }
}
