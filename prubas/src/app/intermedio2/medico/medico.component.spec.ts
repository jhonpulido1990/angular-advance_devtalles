import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicoComponent } from './medico.component';
import { MedicoService } from './medico.service';
import { HttpClientModule } from '@angular/common/http';

describe('Medico Component', () => {
  let component: MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoComponent],
      providers: [MedicoService],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(MedicoComponent);
    component = fixture.componentInstance;
  });
  it('debe de crearse el component', () => {
    expect(component).toBeTruthy();
  });
  it('debe de retornar el nombre', () => {
    const nombre = 'pablo';
    const res = component.saludarMedico(nombre)
    expect(res).toContain(nombre);
  });
});
