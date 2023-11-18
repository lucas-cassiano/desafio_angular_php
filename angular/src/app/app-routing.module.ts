import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registros',
  },
  {
    path: 'registros',
    loadChildren: () =>
      import('./registros/registros.module').then((m) => m.RegistrosModule),
  },
  {
    path: ':nome',
    loadChildren: () =>
      import('./colaborador/colaborador.module').then(
        (m) => m.ColaboradorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
