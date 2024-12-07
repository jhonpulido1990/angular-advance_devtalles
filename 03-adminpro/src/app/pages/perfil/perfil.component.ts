import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PerfilForm } from '../../interfaces/perfil-form.interface';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  public fb = inject(FormBuilder);
  public usuario!: Usuario;
  private usuarioService = inject(UsuarioService);
  private fileUploadService = inject(FileUploadService);
  public imagenSubir!: File;
  public imgTemp:any = null;

  public perfilForm = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this.usuario = this.usuarioService.usuario;
    this.perfilForm.reset({
      nombre: this.usuario.nombre,
      email: this.usuario.email,
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value as PerfilForm)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre!;
        this.usuario.email = email!;

        Swal.fire('guardado', 'cambios fueron guardados', 'success')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0] as File;
    if (!this.imagenSubir) {return this.imgTemp = '';}

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result)
    }
    return this.imgTemp = reader.result;
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('guardado', 'cambios fueron guardados', 'success');
      }).catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
