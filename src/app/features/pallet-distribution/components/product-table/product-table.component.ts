import { Product } from '@/app/core/models/product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() productsChange = new EventEmitter<Product[]>();

  updateConfig(product: Product, rows: number, columns: number) {
    product.palletConfig = { rows, columns };
    this.productsChange.emit(this.products);
  }
}
