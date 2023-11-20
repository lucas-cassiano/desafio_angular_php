import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ColaboradorService } from '../services/colaborador.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  constructor(private colaboradorService: ColaboradorService) {}

  form = {
    nome: '',
    email: '',
    cpf: '',
    celular: null,
    conhecimentos: [],
  };

  handleInput(event: any, input: string): void {
    if (event.target instanceof HTMLInputElement) {
      if (input == 'nome') {
        this.form.nome = event.target.value;
      } else if (input == 'email') {
        this.form.email = event.target.value;
      } else if (input == 'cpf') {
        this.form.cpf = event.target.value;
      } else if (input == 'celular') {
        this.form.celular = event.target.value;
      } else if (input == 'conhecimentos') {
        this.form.conhecimentos = event.target.selectedOptions;
      }
    }
  }

  async handleClick() {
    if (this.form.nome.length == 0 || this.form.nome.length > 100) {
      Swal.fire({
        title: 'Campo nome inválido',
        icon: 'warning',
      });
      return;
    } else if (this.validarEmail(this.form.email) == false) {
      Swal.fire({
        title: 'Campo email inválido',
        icon: 'warning',
      });
      return;
    } else if (this.validarCPF(this.form.cpf) == false) {
      Swal.fire({
        title: 'Campo cpf inválido',
        icon: 'warning',
      });
      return;
    } else if (this.form.conhecimentos.length == 0) {
      Swal.fire({
        title: 'O campo conhecimentos deve ter pelo menos 1 opção',
        icon: 'warning',
      });
      return;
    } else if (this.form.conhecimentos.length > 3) {
      Swal.fire({
        title: 'O campo conhecimentos não pode ter mais de 3 opções',
        icon: 'warning',
      });
      return;
    }

    try {
      await this.colaboradorService.registrar(
        this.form.nome,
        this.form.email,
        this.form.cpf,
        this.form.celular,
        this.form.conhecimentos
      );

      Swal.fire({
        title: 'Registro cadastrado com sucesso!',
        icon: 'success',
      });
    } catch (erro: any) {
      if (erro.status == 422) {
        Swal.fire({
          title: 'Parametros invalidos ou CPF já existe no sistema.',
          icon: 'error',
        });
      }
    }
  }

  limitarSelecoes(event: any): void {
    const maxSelecoes = 3;
    const selecionados = event.target.selectedOptions.length;

    if (selecionados > maxSelecoes) {
      Swal.fire({
        title: 'Você só pode selecionar no máximo 3 itens',
        icon: 'warning',
      });
    } else {
      let array: any = [];
      let dados: HTMLOptionElement[] = Array.from(event.target.selectedOptions);
      for (let i in dados) {
        if (dados[i]) {
          array.push(dados[i].value);
        }
      }

      this.form.conhecimentos = array;
    }
  }

  validarEmail(email: string) {
    // Expressão regular para validar e-mails
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testar se o e-mail corresponde à expressão regular
    return regexEmail.test(email);
  }

  validarCPF(cpf: string) {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verificar se há 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    digito1 = digito1 > 9 ? 0 : digito1;

    // Verificar se o primeiro dígito verificador é válido
    if (parseInt(cpf.charAt(9)) !== digito1) {
      return false;
    }

    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    digito2 = digito2 > 9 ? 0 : digito2;

    // Verificar se o segundo dígito verificador é válido
    if (parseInt(cpf.charAt(10)) !== digito2) {
      return false;
    }

    // CPF válido
    return true;
  }
}
