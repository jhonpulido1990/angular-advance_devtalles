import { Jugador2 } from './jugador2';

describe('Jugador 2 Emit', () => {
  let jugador = new Jugador2();
  beforeEach(() => (jugador = new Jugador2()));
  it('Debe de emitir un evento cuando recibe daño', () => {
    let nuevoHP = 0;
    jugador.hpCambia.subscribe((hp) => {
      nuevoHP = hp;
    });
    jugador.recibeDaño(1000);
    expect(nuevoHP).toBe(0);
  });
  it('Debe de emitir un evento cuando recibe daño y sobrevivir si es menor a 100', () => {
    let nuevoHP = 0;
    jugador.hpCambia.subscribe((hp) => {
      nuevoHP = hp;
    });
    jugador.recibeDaño(50);
    expect(nuevoHP).toBe(50);
  });
});
