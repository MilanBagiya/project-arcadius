import { Pallet } from '@/app/core/models/pallet.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pallet-result',
  templateUrl: './pallet-result.component.html',
})
export class PalletResultComponent {
  @Input() pallets: Pallet[] = [];
}
