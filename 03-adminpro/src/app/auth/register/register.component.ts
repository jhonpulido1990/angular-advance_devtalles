import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject( Router )
  public formsubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['jhon', [Validators.required, Validators.minLength(3)]],
      email: ['jhon@jhon.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [true, [Validators.required]],
    },
    {
      Validators: this.passwordsIguales('password', 'password2'),
    }
  );

  crearUsuario() {
    this.formsubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/')
      },
      (err) => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  compoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formsubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formsubmitted;
  }

  contrasenaNoValida() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formsubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ NoEsIgual: true });
      }
    };
  }
}
