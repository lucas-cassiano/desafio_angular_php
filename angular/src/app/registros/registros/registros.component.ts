import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent {
  inputData: any = '';

  dadosApi = [
    { n: 1, nome: 'Item 1', cpf: '12022544463', status: 'VALIDADO' },
    { n: 2, nome: 'Item 2', cpf: '12022544464', status: 'NÃO VALIDADO' },
    { n: 3, nome: 'Item 3', cpf: '12022544465', status: 'NÃO VALIDADO' },
  ];

  data = this.dadosApi;

  handleInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.inputData = event.target.value;
    }
  }

  handleClick(): void {
    if (this.inputData.length > 0) {
      let array = [];
      const infor = this.dadosApi;

      for (let i in infor) {
        if (
          infor[i].nome.includes(this.inputData) ||
          infor[i].cpf.includes(this.inputData) ||
          infor[i].status.includes(this.inputData)
        ) {
          array.push(infor[i]);
        }
      }

      this.data = array;
    } else {
      Swal.fire({
        title: 'O campo de busca esta vazio',
        text: 'Digite algo para realizar a pesquisa',
        icon: 'warning',
      });
    }
  }
}
