import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './notFound/notFound.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
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
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
