import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../../core/models/product.model';
import { PalletConfigComponent } from './pallet-config.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoSearchComponent } from '../po-search/po-search.component';
import { ProductTableComponent } from '../product-table/product-table.component';

describe('PalletConfigComponent', () => {
  let component: PalletConfigComponent;
  let fixture: ComponentFixture<PalletConfigComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [
        PalletConfigComponent,
        PoSearchComponent,
        ProductTableComponent,
      ],
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PalletConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset pallets when products input changes', () => {
    component.pallets = [{} as any];

    component.ngOnChanges({
      products: new SimpleChange([], [{}], false),
    });

    expect(component.pallets.length).toBe(0);
  });

  it('should show error snackbar if rows or columns are less than 1', () => {
    component.globalRows = 0;
    component.globalColumns = 5;

    component.distributeProducts();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Rows and Columns must be at least 1',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should show warning snackbar if no products are provided', () => {
    component.globalRows = 4;
    component.globalColumns = 4;
    component.products = [];

    component.distributeProducts();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'No products to distribute',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should generate pallets using global configuration', () => {
    const products: Product[] = [{ id: '1', name: 'Product A', quantity: 20 }];

    component.products = products;
    component.globalRows = 2;
    component.globalColumns = 5;

    component.distributeProducts();

    expect(component.pallets.length).toBe(2);
    expect(component.pallets[0].quantityFilled).toBe(10);
    expect(component.pallets[1].quantityFilled).toBe(10);
  });

  it('should use per-product palletConfig override when provided', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product B',
        quantity: 12,
        palletConfig: { rows: 3, columns: 2 },
      },
    ];

    component.products = products;
    component.globalRows = 4;
    component.globalColumns = 4;

    component.distributeProducts();

    expect(component.pallets.length).toBe(2);
    expect(component.pallets[0].capacity).toBe(6);
    expect(component.pallets[1].quantityFilled).toBe(6);
  });

  it('should skip products with invalid capacity or zero quantity', () => {
    component.globalRows = 0;
    component.globalColumns = 5;

    component.products = [
      {
        id: 'P1',
        name: 'Invalid Capacity Product',
        quantity: 10,
      },
      {
        id: 'P2',
        name: 'Zero Quantity Product',
        quantity: 0,
      },
    ];

    component.distributeProducts();

    expect(component.pallets.length).toBe(0);
  });

  it('should update products and reset pallets on products change', () => {
    const newProducts: Product[] = [
      {
        id: 'P1',
        name: 'Product 1',
        quantity: 10,
      },
    ];

    component.pallets = [
      {
        palletNumber: 1,
        productId: 'P1',
        productName: 'Product 1',
        rows: 2,
        columns: 5,
        capacity: 10,
        quantityFilled: 10,
      },
    ];

    component.onProductsChange(newProducts);

    expect(component.products).toEqual(newProducts);
    expect(component.pallets.length).toBe(0);
  });

  it('should emit palletsGenerated event after distribution', () => {
    const products: Product[] = [{ id: '1', name: 'Product C', quantity: 5 }];

    spyOn(component.palletsGenerated, 'emit');

    component.products = products;
    component.globalRows = 1;
    component.globalColumns = 5;

    component.distributeProducts();

    expect(component.palletsGenerated.emit).toHaveBeenCalledWith(
      component.pallets
    );
  });

  it('should continue loop when capacity <= 0 or quantity <= 0', () => {
    component.globalRows = 2;
    component.globalColumns = 2;

    component.products = [
      {
        id: 'P1',
        name: 'Zero Capacity via palletConfig',
        quantity: 10,
        palletConfig: { rows: 0, columns: 5 },
      },
      {
        id: 'P2',
        name: 'Zero Quantity',
        quantity: 0,
      },
    ];

    component.distributeProducts();

    expect(component.pallets.length).toBe(0);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      '0 pallets generated successfully',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should show success snackbar after pallets are generated', () => {
    component.products = [{ id: '1', name: 'Product D', quantity: 5 }];

    component.globalRows = 1;
    component.globalColumns = 5;

    component.distributeProducts();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      '1 pallets generated successfully',
      'Close',
      jasmine.any(Object)
    );
  });
});
