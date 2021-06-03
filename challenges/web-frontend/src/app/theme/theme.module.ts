import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '@theme/base/base.component';
import { FooterComponent } from '@theme/footer/footer.component';
import { HeaderComponent } from '@theme/header/header.component';
import { AngularLineawesomeModule, LaIconLibrary } from 'angular-line-awesome';
import { lasBell, lasSignOutAlt, lasUser } from 'angular-line-awesome/icons';

@NgModule({
  declarations: [BaseComponent, FooterComponent, HeaderComponent],
  exports: [BaseComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, AngularLineawesomeModule],
  providers: [],
})
export class ThemeModule {
  constructor(library: LaIconLibrary) {
    library.addIcons([lasBell, lasUser, lasSignOutAlt]);
  }
}
