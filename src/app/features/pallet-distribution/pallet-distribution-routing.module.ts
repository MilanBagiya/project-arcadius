import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PalletDistributionPageComponent } from './pages/pallet-distribution-page/pallet-distribution-page.component';

const routes: Routes = [{ path: '', component: PalletDistributionPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalletDistributionRoutingModule {}
