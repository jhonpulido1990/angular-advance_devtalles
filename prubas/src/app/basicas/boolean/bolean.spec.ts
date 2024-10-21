import { usuarioIngresado } from './boolean';

describe('Prueba de booleanos', () => {
  it('Debe de retornar true', () => {
    const res = usuarioIngresado();
    expect(res).toBeTruthy();
  });
});
