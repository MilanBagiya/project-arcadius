import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { of, throwError } from 'rxjs';

import { PoSearchComponent } from './po-search.component';
import { PurchaseOrder } from '@/app/core/models/purchase-order.model';
import { PurchaseOrderService } from '@/app/core/services/purchase-order.service';

describe('PoSearchComponent', () => {
  let component: PoSearchComponent;
  let fixture: ComponentFixture<PoSearchComponent>;
  let poServiceSpy: jasmine.SpyObj<PurchaseOrderService>;

  const mockResults: PurchaseOrder[] = [
    {
      orderNumber: 'PO-001',
      description: 'Test Order',
      date: new Date(),
      products: [],
    },
  ];

  beforeEach(async () => {
    poServiceSpy = jasmine.createSpyObj('PurchaseOrderService', [
      'searchPurchaseOrders',
    ]);

    await TestBed.configureTestingModule({
      declarations: [PoSearchComponent],
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
      providers: [{ provide: PurchaseOrderService, useValue: poServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not search if search term is empty', () => {
    component.searchTerm = '   ';
    component.onSearch();

    expect(poServiceSpy.searchPurchaseOrders).not.toHaveBeenCalled();
  });

  it('should search purchase orders and set results', fakeAsync(() => {
    poServiceSpy.searchPurchaseOrders.and.returnValue(of(mockResults));

    component.searchTerm = 'PO';
    component.onSearch();

    tick();

    expect(poServiceSpy.searchPurchaseOrders).toHaveBeenCalledWith('PO');
    expect(component.searchResults).toEqual(mockResults);
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle search error and reset loading state', fakeAsync(() => {
    poServiceSpy.searchPurchaseOrders.and.returnValue(
      throwError(() => new Error('Search failed'))
    );

    component.searchTerm = 'PO';
    component.onSearch();

    tick();

    expect(component.searchResults).toEqual([]);
    expect(component.isLoading).toBeFalse();
  }));

  it('should emit selected purchase order and re-run search', fakeAsync(() => {
    poServiceSpy.searchPurchaseOrders.and.returnValue(of(mockResults));
    spyOn(component.poSelected, 'emit');

    const po = mockResults[0];
    component.selectPo(po);

    tick();

    expect(component.poSelected.emit).toHaveBeenCalledWith(po);
    expect(component.searchTerm).toBe(po.orderNumber);
    expect(poServiceSpy.searchPurchaseOrders).toHaveBeenCalled();
  }));

  it('should set search term and perform quick search', fakeAsync(() => {
    poServiceSpy.searchPurchaseOrders.and.returnValue(of(mockResults));

    component.setQuickSearch('PO-001');

    tick();

    expect(component.searchTerm).toBe('PO-001');
    expect(component.searchResults).toEqual(mockResults);
  }));

  it('should clear search and results', () => {
    component.searchTerm = 'PO';
    component.searchResults = mockResults;

    component.clearSearch();

    expect(component.searchTerm).toBe('');
    expect(component.searchResults).toEqual([]);
  });

  it('should clear results only', () => {
    component.searchResults = mockResults;

    component.clearResults();

    expect(component.searchResults).toEqual([]);
  });

  it('should trigger search on Enter key press', () => {
    spyOn(component, 'onSearch');

    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    component.onKeyPress(event);

    expect(component.onSearch).toHaveBeenCalled();
  });
});
