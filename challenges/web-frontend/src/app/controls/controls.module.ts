import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '@controls/card';
import { NotificationComponent } from '@controls/notification';
import { AngularLineawesomeModule, LaIconLibrary } from 'angular-line-awesome';
import {
  lasCalendar,
  lasGasPump,
  lasHandHoldingUsd,
  lasHourglassHalf,
  lasSitemap,
  lasTachometerAlt,
} from 'angular-line-awesome/icons';

@NgModule({
  declarations: [CardComponent, NotificationComponent],
  exports: [CardComponent, NotificationComponent],
  imports: [CommonModule, AngularLineawesomeModule, MatCardModule, MatButtonModule],
})
export class ControlsModule {
  constructor(library: LaIconLibrary) {
    library.addIcons([lasCalendar, lasGasPump, lasTachometerAlt, lasSitemap, lasHourglassHalf, lasHandHoldingUsd]);
  }
}
