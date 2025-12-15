import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PalletDistributionPageComponent } from './pallet-distribution-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Pallet } from '@/app/core/models/pallet.model';
import { PurchaseOrder } from '@/app/core/models/purchase-order.model';
import { PoSearchComponent } from '../../components/po-search/po-search.component';

describe('PalletDistributionPageComponent', () => {
  let component: PalletDistributionPageComponent;
  let fixture: ComponentFixture<PalletDistributionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PalletDistributionPageComponent, PoSearchComponent],
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

    fixture = TestBed.createComponent(PalletDistributionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected purchase order and clear pallets', () => {
    const po = {
      orderNumber: 'PO-001',
      products: [{ quantity: 5 }],
    } as PurchaseOrder;

    component.pallets = [{} as Pallet];

    spyOn(window, 'scrollTo');

    component.handlePurchaseOrderSelection(po);

    expect(component.selectedPurchaseOrder).toBe(po);
    expect(component.pallets.length).toBe(0);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should clear selection when null is passed', () => {
    component.selectedPurchaseOrder = {} as PurchaseOrder;
    component.pallets = [{} as Pallet];

    component.handlePurchaseOrderSelection(null);

    expect(component.selectedPurchaseOrder).toBeNull();
    expect(component.pallets.length).toBe(0);
  });

  it('should update pallets when pallets are generated', () => {
    const pallets: Pallet[] = [
      { palletNumber: 1 } as Pallet,
      { palletNumber: 2 } as Pallet,
    ];

    component.handlePalletsGenerated(pallets);

    expect(component.pallets.length).toBe(2);
  });

  it('should reset configuration by clearing pallets', () => {
    component.pallets = [{} as Pallet];

    component.resetConfiguration();

    expect(component.pallets.length).toBe(0);
  });

  it('should calculate total items from selected purchase order', () => {
    component.selectedPurchaseOrder = {
      products: [{ quantity: 2 }, { quantity: 3 }],
    } as PurchaseOrder;

    const total = component.calculateTotalItems();

    expect(total).toBe(5);
  });

  it('should return 0 when no purchase order is selected', () => {
    component.selectedPurchaseOrder = null;

    expect(component.calculateTotalItems()).toBe(0);
  });

  it('should calculate total items when purchase order has products', () => {
    component.selectedPurchaseOrder = {
      orderNumber: 'PO-1',
      description: 'Test PO',
      date: new Date(),
      products: [
        { id: 'P1', name: 'Product 1', quantity: 0 },
        { id: 'P2', name: 'Product 2', quantity: 10 },
      ],
    };

    const total = component.calculateTotalItems();

    expect(total).toBe(10);
  });

  it('should update lastUpdated timestamp', () => {
    const oldDate = component.lastUpdated;

    component.updateLastUpdated();

    expect(component.lastUpdated.getTime()).toBeGreaterThan(oldDate.getTime());
  });

  it('should return early and not export when pallets are empty', () => {
    component.pallets = [];

    const exportSpy = spyOn(component['exportService'], 'exportToCsv');

    component.exportResults();

    expect(exportSpy).not.toHaveBeenCalled();
  });

  it('should reset selectedPurchaseOrder and pallets when clearSearch is called', () => {
    component.selectedPurchaseOrder = { id: 1, name: 'PO-001' } as any;
    component.pallets = [{ id: 1 }, { id: 2 }] as any;

    component.clearSearch();

    expect(component.selectedPurchaseOrder).toBeNull();
    expect(component.pallets).toEqual([]);
  });

  it('should export pallets when pallets exist', () => {
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

    const exportSpy = spyOn(component['exportService'], 'exportToCsv');

    component.exportResults();

    expect(exportSpy).toHaveBeenCalledWith(component.pallets);
  });
});
