import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletConfigComponent } from './pallet-config.component';

describe('PalletConfigComponent', () => {
  let component: PalletConfigComponent;
  let fixture: ComponentFixture<PalletConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalletConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
