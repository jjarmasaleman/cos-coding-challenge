import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { CoreModule } from '@core/core.module';
import { AuctionsService } from '@modules/auctions';
import { AuthService } from '@modules/auth';
import { AuthModule } from '@modules/auth/auth.module';
import { ThemeModule } from '@theme/theme.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, ThemeModule, AuthModule.forRoot(), AppRoutingModule, BrowserModule, HttpClientModule],
  providers: [AuthService, AuctionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
