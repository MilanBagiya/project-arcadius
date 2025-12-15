import { Pallet } from '@/app/core/models/pallet.model';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PalletResultComponent } from './pallet-result.component';

describe('PalletResultComponent', () => {
  let component: PalletResultComponent;
  let fixture: ComponentFixture<PalletResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PalletResultComponent],
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

    fixture = TestBed.createComponent(PalletResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept pallets input', () => {
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

    component.pallets = pallets;
    fixture.detectChanges();

    expect(component.pallets.length).toBe(1);
    expect(component.pallets[0].productName).toBe('Product A');
  });
});
