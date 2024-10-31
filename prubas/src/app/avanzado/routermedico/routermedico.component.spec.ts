import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutermedicoComponent } from './routermedico.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

class FakeRouter {
  navigate(params: any) {}
}

class FakeActivatedRoute {
  /* params: Observable<any> = new Observable<any>(); */
  private subject = new Subject();

  push(valor: any) {
    this.subject.next(valor);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('RoutermedicoComponent', () => {
  let component: RoutermedicoComponent;
  let fixture: ComponentFixture<RoutermedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutermedicoComponent],
      providers: [
        {
          provide: Router,
          useClass: FakeRouter,
        },
        {
          provide: ActivatedRoute,
          useClass: FakeActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(RoutermedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de redireccionar a Medico cuando se guarde', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.guardarMedico();
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('debe de colocar el id nuevo', ()=> {
    component = fixture.componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({id: 'nuevo'});
    expect(component.id).toBe('nuevo')
  })
});
