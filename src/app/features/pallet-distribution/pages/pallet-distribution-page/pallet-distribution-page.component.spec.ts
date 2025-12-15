import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletDistributionPageComponent } from './pallet-distribution-page.component';

describe('PalletDistributionPageComponent', () => {
  let component: PalletDistributionPageComponent;
  let fixture: ComponentFixture<PalletDistributionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalletDistributionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletDistributionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
