import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from '@core/state';
import { BaseComponent } from '@theme/base/base.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['{SALESMAN_USER}', '{BUYER_USER}'],
    },
    children: [
      {
        path: 'auctions',
        loadChildren: () => import('@modules/auctions/auctions.module').then((m) => m.AuctionsModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
