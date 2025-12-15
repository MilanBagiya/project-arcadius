import { TestBed } from '@angular/core/testing';
import jsPDF from 'jspdf';
import { Pallet } from '../models/pallet.model';
import { PalletExportService } from './pallet-export.service';

describe('PalletExportService', () => {
  let service: PalletExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalletExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and click a download link for CSV export', () => {
    const pallets: Pallet[] = [
      {
        palletNumber: 1,
        productId: '101',
        productName: 'Product A',
        rows: 2,
        columns: 5,
        capacity: 10,
        quantityFilled: 8,
      },
    ];

    const link = document.createElement('a');
    spyOn(link, 'click');

    spyOn(document, 'createElement').and.returnValue(link);
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');
    spyOn(URL, 'createObjectURL').and.returnValue('blob:url');

    service.exportToCsv(pallets);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(link.click).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalledWith(link);
    expect(document.body.removeChild).toHaveBeenCalledWith(link);
  });
});
