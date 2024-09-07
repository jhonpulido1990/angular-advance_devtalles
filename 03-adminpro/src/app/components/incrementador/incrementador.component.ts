import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css',
})
export class IncrementadorComponent {
  @Input() public progress: number = 50;

  @Output() public valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return (this.progress = 0);
    }
    this.valorSalida.emit(this.progress + valor);
    return (this.progress = this.progress + valor);
  }
}
