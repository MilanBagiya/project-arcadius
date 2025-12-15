import { Pallet } from '@/app/core/models/pallet.model';
import { Product } from '@/app/core/models/product.model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pallet-config',
  templateUrl: './pallet-config.component.html',
})
export class PalletConfigComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Output() palletsGenerated = new EventEmitter<Pallet[]>();

  globalRows = 4;
  globalColumns = 7;
  pallets: Pallet[] = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.pallets = [];
    }
  }

  onProductsChange(products: Product[]): void {
    this.products = products;
    this.pallets = [];
  }

  distributeProducts(): void {
    if (this.globalRows < 1 || this.globalColumns < 1) {
      this.openSnackBar('Rows and Columns must be at least 1', 'error');
      return;
    }

    if (!this.products.length) {
      this.openSnackBar('No products to distribute', 'warning');
      return;
    }

    this.pallets = [];
    let palletCounter = 1;

    for (const product of this.products) {
      const rows = product.palletConfig?.rows ?? this.globalRows;
      const columns = product.palletConfig?.columns ?? this.globalColumns;
      const capacity = rows * columns;

      if (capacity <= 0 || product.quantity <= 0) continue;

      let remaining = product.quantity;

      while (remaining > 0) {
        const quantityFilled = Math.min(remaining, capacity);

        this.pallets.push({
          palletNumber: palletCounter++,
          productId: product.id,
          productName: product.name,
          rows,
          columns,
          capacity,
          quantityFilled,
        });

        remaining -= quantityFilled;
      }
    }

    this.palletsGenerated.emit(this.pallets);

    this.openSnackBar(
      `${this.pallets.length} pallets generated successfully`,
      'success'
    );
  }

  private openSnackBar(
    message: string,
    type: 'success' | 'error' | 'warning'
  ): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: `snackbar-${type}`,
    });
  }
}
