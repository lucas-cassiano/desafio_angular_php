import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrosService } from '../services/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent {
  constructor(
    private router: Router,
    private registrosService: RegistrosService
  ) {
    this.inicializarDados();
  }

  async inicializarDados() {
    this.dadosApi = await this.registrosService.list();
    this.data = this.dadosApi;
  }

  inputData: any = '';

  dadosApi: any = [];

  data = this.dadosApi;

  handleRegistro(nome: string) {
    this.router.navigate([nome + '/validar']);
  }

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
