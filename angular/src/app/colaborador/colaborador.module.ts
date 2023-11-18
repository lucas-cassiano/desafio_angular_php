import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ValidarComponent } from './validar/validar.component';
import { RegistrarComponent } from './registrar/registrar.component';

@NgModule({
  declarations: [ValidarComponent, RegistrarComponent],
  imports: [CommonModule, ColaboradorRoutingModule],
})
export class ColaboradorModule {}
