import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Product } from '../../../../core/models/product.model';
import { ProductTableComponent } from './product-table.component';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update product palletConfig and emit productsChange', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product A',
        quantity: 10,
      },
    ];

    component.products = products;
    spyOn(component.productsChange, 'emit');

    component.updateConfig(products[0], 3, 4);

    expect(products[0].palletConfig).toEqual({
      rows: 3,
      columns: 4,
    });

    expect(component.productsChange.emit).toHaveBeenCalledWith(products);
  });
});
