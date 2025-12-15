import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Pallet } from '../../../../core/models/pallet.model';
import { PurchaseOrder } from '../../../../core/models/purchase-order.model';
import { PalletExportService } from '../../../../core/services/pallet-export.service';

@Component({
  selector: 'app-pallet-distribution-page',
  templateUrl: './pallet-distribution-page.component.html',
  styleUrls: ['./pallet-distribution-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PalletDistributionPageComponent implements OnInit {
  selectedPurchaseOrder: PurchaseOrder | null = null;
  pallets: Pallet[] = [];
  currentYear: number = new Date().getFullYear();
  lastUpdated: Date = new Date();

  constructor(private exportService: PalletExportService) {}

  ngOnInit(): void {}

  handlePurchaseOrderSelection(po: PurchaseOrder | null): void {
    if (!po) return this.clearSelection();

    this.selectedPurchaseOrder = po;
    this.pallets = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePalletsGenerated(pallets: Pallet[]): void {
    this.pallets = [...pallets];
  }

  clearSelection(): void {
    this.selectedPurchaseOrder = null;
    this.pallets = [];
  }

  calculateTotalItems(): number {
    return (
      this.selectedPurchaseOrder?.products?.reduce(
        (total, p) => total + (p.quantity || 0),
        0
      ) || 0
    );
  }

  exportResults(): void {
    if (!this.pallets.length) return;
    this.exportService.exportToCsv(this.pallets);
  }

  resetConfiguration(): void {
    this.pallets = [];
  }

  updateLastUpdated(): void {
    this.lastUpdated = new Date();
  }
}
