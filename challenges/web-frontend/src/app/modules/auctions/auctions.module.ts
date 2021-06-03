import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlsModule } from '@controls/controls.module';
import { AuctionsComponent } from '@modules/auctions/components/auctions.component';

const routes: Routes = [
  {
    path: '',
    component: AuctionsComponent,
  },
];

@NgModule({
  declarations: [AuctionsComponent],
  imports: [CommonModule, ControlsModule, RouterModule.forChild(routes)],
})
export class AuctionsModule {}
