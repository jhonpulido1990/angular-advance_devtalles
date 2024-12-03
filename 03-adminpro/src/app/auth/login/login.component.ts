import { AfterViewInit, Component, ElementRef, inject, ViewChild,  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interfaces';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  public router = inject(Router)
  public formsubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['123456', [Validators.required]],
    remember: [false],
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '879582612969-4j43lmdap0lsd7jm1efko2945vf5j00p.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      /* document.getElementById("buttonDiv"), */
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.logingoogle(response.credential).subscribe(
      resp => {
        // console.log({login: resp});
        // navegar al dashboard
        this.router.navigateByUrl('/');
      }
    );
  }

  login() {
    this.usuarioService.login(this.loginForm.value as LoginForm).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.value['email'] as any);
        } else {
          localStorage.removeItem('email');
        }
        // navegar al dashboard
        this.router.navigateByUrl('/');
      },
      (error) => {
        // si sucede un error
        Swal.fire('Error', error.error.msg, 'error');
      }
    );
    /* console.log(this.loginForm.value) */
    /* this.router.navigateByUrl('/'); */
  }
}
