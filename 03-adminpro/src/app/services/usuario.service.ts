import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    google.accounts.oauth2.revoke('jjpulido8@misena.edu.co', () => {
      this.router.navigateByUrl('/login');
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError(error => of(false) )
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(`${base_url}/usuarios`, formData, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  login(formData: LoginForm) {
    return this.http
      .post(`${base_url}/login`, formData, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  logingoogle(token: string) {
    return this.http
      .post(`${base_url}/login/google`, { token }, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }
}
