import { Component } from '@angular/core';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css'],
})
export class ValidarComponent {
  handleValidar() {
    alert('Esta valido');
  }

  handleNotValidar() {
    alert('Não esta valido');
  }
}
