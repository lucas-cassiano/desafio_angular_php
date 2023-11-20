import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Colaborador {
  nome: string;
  cpf: string;
  email: string;
  status: string;
  celular?: string;
  conhecimentos: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  constructor(private hhtpCliente: HttpClient) {}

  private readonly API = 'http://127.0.0.1:8000/api/collaborador/';

  async getRegistro(nome: string): Promise<Colaborador | undefined> {
    return await this.hhtpCliente
      .get<Colaborador>(this.API + '' + nome)
      .toPromise();
  }

  async alterarStatus(cpf: string, status: number) {
    console.log(status);
    return await this.hhtpCliente
      .patch<Colaborador>(this.API + '' + cpf + '/' + status, {})
      .toPromise();
  }
}
