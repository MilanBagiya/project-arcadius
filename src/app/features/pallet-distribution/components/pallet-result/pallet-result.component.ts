import { Component, Input } from '@angular/core';
import { Pallet } from '../../../../core/models/pallet.model';

@Component({
  selector: 'app-pallet-result',
  templateUrl: './pallet-result.component.html',
})
export class PalletResultComponent {
  @Input() pallets: Pallet[] = [];
}
