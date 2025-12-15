import { NgModule } from '@angular/core';
import { PalletDistributionRoutingModule } from './pallet-distribution-routing.module';

import { PalletConfigComponent } from './components/pallet-config/pallet-config.component';
import { PalletResultComponent } from './components/pallet-result/pallet-result.component';
import { PoSearchComponent } from './components/po-search/po-search.component';
import { PalletDistributionPageComponent } from './pages/pallet-distribution-page/pallet-distribution-page.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  declarations: [
    PoSearchComponent,
    PalletConfigComponent,
    PalletResultComponent,
    ProductTableComponent,
    PalletDistributionPageComponent
  ],
  imports: [
    SharedModule,
    PalletDistributionRoutingModule
  ]
})
export class PalletDistributionModule {}
