import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  public formsubmitted = false;

  public loginForm = this.fb.group(
    {
      email: ['jhon@jhon.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      remember: [false],
    }
  );

  login() {
    this.usuarioService.login(this.loginForm.value as LoginForm).
      subscribe( resp => {
        console.log(resp)
      }, error => {
        // si sucede un error
        Swal.fire('Error', error.error.msg, 'error')
      })
    /* console.log(this.loginForm.value) */
    /* this.router.navigateByUrl('/'); */
  }
}
