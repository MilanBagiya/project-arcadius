import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../core/models/product.model';

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
