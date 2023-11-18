import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarComponent } from './validar/validar.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: RegistrarComponent,
  },
  {
    path: 'validar',
    component: ValidarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradorRoutingModule {}
