import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const autGuard: CanActivateFn = (route, state) => {
  var usuarioService = inject(UsuarioService);
  var router = inject(Router)

  return usuarioService.validarToken().pipe(
    tap(
      estaAutenticado => {
        if(!estaAutenticado) {
          router.navigateByUrl('/login')
        }
      }
    )
  );
};
