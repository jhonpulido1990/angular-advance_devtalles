import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css',
})
export class IncrementadorComponent implements OnInit {
  @Input() public progress: number = 50;
  @Input() public btnClass: string = 'btn-primary'

  @Output() public valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progress = 0;
    }
    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress);
    return
  }

  onChange(valor: number) {
    if ( valor >= 100 ) this.progress = 100;
    else if ( valor <= 0 ) this.progress = 0;
    else this.progress = valor;

    this.valorSalida.emit(this.progress);
  }
}
