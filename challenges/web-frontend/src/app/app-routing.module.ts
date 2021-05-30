import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '@theme/base/base.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'auctions',
        loadChildren: () => import('@modules/auctions/auctions.module').then((m) => m.AuctionsModule),
      },
      {
        path: '',
        redirectTo: 'auctions',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auctions',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
