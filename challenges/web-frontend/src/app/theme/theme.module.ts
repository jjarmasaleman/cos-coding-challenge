import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from '@theme/base/base.component';

@NgModule({
  declarations: [BaseComponent],
  exports: [BaseComponent],
  imports: [CommonModule],
  providers: [],
})
export class ThemeModule {}
