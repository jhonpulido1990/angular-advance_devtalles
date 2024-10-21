import { Jugador } from './clases';

describe('Prueba de clase', () => {
  let jugador = new Jugador();

  beforeAll(()=> {
    //console.log('beforeAll')
  });
  beforeEach(()=> {
    //console.log('beforeEach')
    jugador = new Jugador();
  });

  afterAll(()=> {
    //console.log('afterAll')
  });
  afterEach(()=> {
    //console.log('after')
  })

  it('Debe de retornar 80 de hp, si recibe de daño 20', () => {
    const res = jugador.recibeDaño(20);
    expect(res).toBe(80);
  });
  it('Debe de retornar 50 de hp, si recibe 50 de daño', ()=>{
    const res = jugador.recibeDaño(50);
    expect(res).toBe(50);
  })
  it('Debe de retornar 0 de hp, si recibe 101 de daño', () => {
    const res = jugador.recibeDaño(101);
    expect(res).toBe(0);
  });
});
