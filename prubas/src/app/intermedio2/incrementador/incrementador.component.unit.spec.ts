import { IncrementadorComponent } from "./incrementador.component";

describe('incrementador component unit', ()=> {
  let component: IncrementadorComponent;
  beforeEach(() => component = new IncrementadorComponent());
  it('NO debe de pasar de 100 el progreso', ()=> {
    component.progreso = 50;
    component.cambiarValor(5);
    expect(component.progreso).toBe(55);
  })
});
