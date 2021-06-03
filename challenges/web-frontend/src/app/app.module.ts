import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { NotificationService } from '@controls/notification';
import { CoreModule } from '@core/core.module';
import { UtilsService } from '@core/services/utils.service';
import { reducers } from '@core/state';
import { AuctionsService } from '@modules/auctions';
import { AuthService } from '@modules/auth';
import { AuthModule } from '@modules/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ThemeModule } from '@theme/theme.module';
import { AngularLineawesomeModule, LaIconLibrary } from 'angular-line-awesome';
import { lasExclamationTriangle } from 'angular-line-awesome/icons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    ThemeModule,
    AuthModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularLineawesomeModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [AuthService, AuctionsService, UtilsService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: LaIconLibrary) {
    library.addIcons([lasExclamationTriangle]);
  }
}
