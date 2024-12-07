import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { PerfilForm } from '../interfaces/perfil-form.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public usuario!: Usuario;

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    google.accounts.oauth2.revoke('jjpulido8@misena.edu.co', () => {
      this.router.navigateByUrl('/login');
    });
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean> {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        },
      })
      .pipe(
        map((resp: any) => {
          const { token, usuarioDB} = resp;
          const {email, google, nombre, role, img = '', uid} = usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token', token);
          return true;
        }),
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

  actualizarPerfil( data: PerfilForm ) {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      },
    });
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
