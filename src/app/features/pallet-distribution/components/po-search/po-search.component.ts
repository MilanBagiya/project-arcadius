import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
} from '@angular/animations';
import { PurchaseOrder } from '../../../../core/models/purchase-order.model';
import { PurchaseOrderService } from '../../../../core/services/purchase-order.service';

@Component({
  selector: 'app-po-search',
  templateUrl: './po-search.component.html',
  styleUrls: ['./po-search.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-10px)' }),
            stagger('50ms', [
              animate(
                '200ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class PoSearchComponent {
  @Output() poSelected = new EventEmitter<PurchaseOrder>();

  searchTerm = '';
  searchResults: PurchaseOrder[] | null = [];
  isLoading = false;

  constructor(private poService: PurchaseOrderService) {}

  onSearch(): void {
    if (!this.searchTerm.trim()) return;

    this.isLoading = true;
    this.poService.searchPurchaseOrders(this.searchTerm).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search failed:', error);
        this.isLoading = false;
        this.searchResults = [];
      },
    });
  }

  selectPo(po: PurchaseOrder): void {
    this.poSelected.emit(po);
    this.searchTerm = po.orderNumber;
    this.onSearch();
  }

  setQuickSearch(term: string): void {
    this.searchTerm = term;
    this.onSearch();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
  }

  clearResults(): void {
    this.searchResults = [];
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
