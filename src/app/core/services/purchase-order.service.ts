import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MOCK_PURCHASE_ORDERS } from '../api/mock-data';
import { MockHttpService } from '../api/mock-http.service';
import { PurchaseOrder } from '../models/purchase-order.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  constructor(private http: MockHttpService) {}

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get(MOCK_PURCHASE_ORDERS, 500);
  }

  searchPurchaseOrders(term: string): Observable<PurchaseOrder[]> {
    const normalizedTerm = term.trim().toLowerCase();

    return this.getPurchaseOrders().pipe(
      map((orders) =>
        orders.filter(
          (po) =>
            po.orderNumber.toLowerCase().includes(normalizedTerm) ||
            po.description.toLowerCase().includes(normalizedTerm)
        )
      )
    );
  }

  getPurchaseOrderByNumber(
    orderNumber: string
  ): Observable<PurchaseOrder | undefined> {
    return this.getPurchaseOrders().pipe(
      map((orders) =>
        orders.find(
          (po) => po.orderNumber.toLowerCase() === orderNumber.toLowerCase()
        )
      )
    );
  }
}
