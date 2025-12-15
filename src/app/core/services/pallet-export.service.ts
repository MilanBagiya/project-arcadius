import { Injectable } from '@angular/core';
import { Pallet } from '../models/pallet.model';

@Injectable({
  providedIn: 'root',
})
export class PalletExportService {
  exportToCsv(pallets: Pallet[]): void {
    const headers = [
      'Pallet Number',
      'Product ID',
      'Product Name',
      'Rows',
      'Columns',
      'Capacity',
      'Quantity Filled',
    ];

    const rows = pallets.map((p) => [
      p.palletNumber,
      p.productId,
      p.productName,
      p.rows,
      p.columns,
      p.capacity,
      p.quantityFilled,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pallet-distribution.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
