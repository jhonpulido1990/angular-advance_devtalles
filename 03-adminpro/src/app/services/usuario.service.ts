import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.development';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData, {
      withCredentials: true,
    }).pipe(
      tap(
        (res: any)=> {
          localStorage.setItem('token', res.token)
        }
      )
    );
  }

  login(formData: LoginForm) {
    return this.http.post(
      `${base_url}/login`,
       formData ,
      {
        withCredentials: true,
      }
    ).pipe(
      tap(
        (res: any) => {
          localStorage.setItem('token', res.token)
        }
      )
    );
  }
}
