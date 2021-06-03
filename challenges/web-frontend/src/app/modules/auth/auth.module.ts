import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { InterceptService } from '@core/services/intercept.service';
import { AuthEffects, AuthGuard, authReducer, RoleGuard } from '@core/state';
import { AuthComponent } from '@modules/auth/components/auth.component';
import { LoginComponent } from '@modules/auth/components/login/login.component';
import { AuthService } from '@modules/auth/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { returnUrl: window.location.pathname },
      },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  exports: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
  ],
})
export class AuthModule {
  public static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard, RoleGuard],
    };
  }
}
