import { mensaje } from "./string"


describe('Pruebas de string', () => {
  it('debe regresar un string', () => {
    const resp = mensaje('jhon');

    expect( typeof resp ).toBe('string');
  });
  it('debe regresar un saludo', () => {
    const nombre = 'jhon';
    const resp = mensaje(nombre);

    expect(resp).toContain(nombre);
  });
})
