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

  private readonly API = 'http://127.0.0.1:8000/api/';

  async getRegistro(nome: string): Promise<Colaborador | undefined> {
    return await this.hhtpCliente
      .get<Colaborador>(this.API + 'collaborador/' + nome)
      .toPromise();
  }

  async alterarStatus(cpf: string, status: number) {
    return await this.hhtpCliente
      .patch<Colaborador>(this.API + 'collaborador/' + cpf + '/' + status, {})
      .toPromise();
  }

  async registrar(
    nome: string,
    email: string,
    cpf: string,
    celular: string | null,
    conhecimentos: string[]
  ) {
    return await this.hhtpCliente
      .post(this.API + 'cadastro', {
        nome: nome,
        email: email,
        cpf: cpf,
        celular: celular ? celular : null,
        conhecimentos: conhecimentos,
      })
      .toPromise();
  }
}
