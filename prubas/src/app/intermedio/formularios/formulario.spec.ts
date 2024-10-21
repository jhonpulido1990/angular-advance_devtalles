import { FormBuilder } from "@angular/forms";
import { FormularioRegister } from "./formulario"


describe('Formularios', ()=> {
  let component: FormularioRegister;

  beforeEach(()=> {
    component = new FormularioRegister( new FormBuilder );
  });
  it('Debe de crear un formulario con dos campos', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });
  it('El email debe ser obligatorio', ()=> {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });
  it('El email debe ser un correo valido', () => {
    const control = component.form.get('email');
    control?.setValue('JhonPulido@');
    expect(control?.valid).toBeFalsy();
  });
})

