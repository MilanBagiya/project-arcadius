import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletResultComponent } from './pallet-result.component';

describe('PalletResultComponent', () => {
  let component: PalletResultComponent;
  let fixture: ComponentFixture<PalletResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalletResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
