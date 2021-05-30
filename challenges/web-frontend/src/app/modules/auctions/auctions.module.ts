import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionsComponent } from '@modules/auctions/components/auctions.component';

const routes: Routes = [
  {
    path: '',
    component: AuctionsComponent,
  },
];

@NgModule({
  declarations: [AuctionsComponent],
  exports: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class AuctionsModule {}
