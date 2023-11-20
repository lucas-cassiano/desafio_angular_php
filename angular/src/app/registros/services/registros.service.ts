import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  constructor(private hhtpCliente: HttpClient) {}

  private readonly API = 'http://127.0.0.1:8000/api/collaborators';

  async list() {
    const response = await this.hhtpCliente.get(this.API).toPromise();
    return response;
  }
}
