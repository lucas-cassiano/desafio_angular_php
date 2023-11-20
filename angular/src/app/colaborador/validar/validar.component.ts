import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from '../services/colaborador.service';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css'],
})
export class ValidarComponent {
  constructor(
    private redirect: Router,
    private route: ActivatedRoute,
    private colaboradorService: ColaboradorService
  ) {
    this.getDados(this.route.snapshot.paramMap.get('nome'));
  }

  nome: any;
  email: any;
  cpf: any;
  celular: any;
  conhecimentos: any;
  status: any;

  async getDados(nome: any) {
    const dados = await this.colaboradorService.getRegistro(nome);

    if (dados?.cpf) {
      this.nome = dados?.nome;
      this.email = dados?.email;
      this.cpf = dados?.cpf;
      this.celular = dados?.celular;
      this.conhecimentos = dados?.conhecimentos;
      this.status = dados?.status;
    } else {
      this.redirect.navigate(['']);
    }
  }

  async handleValidar(status: boolean) {
    const result = await this.colaboradorService.alterarStatus(
      this.cpf,
      status ? 1 : 0
    );

    if (result) {
      this.status = this.status == 'VALIDADO' ? 'NÃO VALIDADO' : 'VALIDADO';
    }
  }
}
