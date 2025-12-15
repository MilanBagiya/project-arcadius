import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PurchaseOrderService } from './purchase-order.service';
import { MockHttpService } from '../api/mock-http.service';
import { MOCK_PURCHASE_ORDERS } from '../api/mock-data';
import { of } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order.model';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  let httpService: jasmine.SpyObj<MockHttpService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('MockHttpService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PurchaseOrderService,
        { provide: MockHttpService, useValue: httpSpy },
      ],
    });

    service = TestBed.inject(PurchaseOrderService);
    httpService = TestBed.inject(
      MockHttpService
    ) as jasmine.SpyObj<MockHttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return purchase orders', fakeAsync(() => {
    httpService.get.and.returnValue(of(MOCK_PURCHASE_ORDERS));

    let result: any;
    service.getPurchaseOrders().subscribe((data) => (result = data));

    tick();

    expect(httpService.get).toHaveBeenCalledWith(MOCK_PURCHASE_ORDERS, 500);
    expect(result).toEqual(MOCK_PURCHASE_ORDERS);
  }));

  it('should search purchase orders by order number or description', fakeAsync(() => {
    httpService.get.and.returnValue(of(MOCK_PURCHASE_ORDERS));

    const sample = MOCK_PURCHASE_ORDERS[0];
    const searchTerm = sample.orderNumber.substring(0, 3).toLowerCase();

    let result: any;

    service.searchPurchaseOrders(searchTerm).subscribe((data) => {
      result = data;
    });

    tick();

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain(sample);
  }));

  it('should search purchase orders by description', (done) => {
    const service = TestBed.inject(PurchaseOrderService);

    const mockOrders: PurchaseOrder[] = [
      {
        orderNumber: 'PO-001',
        description: 'Office Chairs',
        date: new Date(),
        products: [],
      },
      {
        orderNumber: 'PO-002',
        description: 'Industrial Pallets',
        date: new Date(),
        products: [],
      },
    ];

    spyOn(service, 'getPurchaseOrders').and.returnValue(of(mockOrders));

    service.searchPurchaseOrders('pallet').subscribe((results) => {
      expect(results.length).toBe(1);
      expect(results[0].description).toContain('Pallet');
      done();
    });
  });

  it('should return matching purchase order by number (case-insensitive)', fakeAsync(() => {
    httpService.get.and.returnValue(of(MOCK_PURCHASE_ORDERS));

    const target = MOCK_PURCHASE_ORDERS[0];
    let result: any;

    service
      .getPurchaseOrderByNumber(target.orderNumber.toUpperCase())
      .subscribe((po) => (result = po));

    tick();

    expect(result).toEqual(target);
  }));

  it('should return undefined if purchase order number is not found', fakeAsync(() => {
    httpService.get.and.returnValue(of(MOCK_PURCHASE_ORDERS));

    let result: any;
    service
      .getPurchaseOrderByNumber('NON_EXISTING_PO')
      .subscribe((po) => (result = po));

    tick();

    expect(result).toBeUndefined();
  }));
});
