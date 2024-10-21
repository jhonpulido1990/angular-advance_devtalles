import { Component } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: [],
})
export class MedicoComponent {
  medicos: any[] = [];

  constructor(public _medicoservice: MedicoService) {}
  saludarMedico(nombre: string): string {
    return `Hola ${nombre}`;
  }
  obtenerMedico() {
    this._medicoservice.getMedicos().subscribe((medicos: any)=> this.medicos = medicos);
  }
}
