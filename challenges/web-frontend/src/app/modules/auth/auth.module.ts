import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@modules/auth/components/auth.component';
import { LoginComponent } from '@modules/auth/components/login/login.component';
import { AuthService } from '@modules/auth/services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { returnUrl: window.location.pathname },
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  providers: [],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
