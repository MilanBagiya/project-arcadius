import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoSearchComponent } from './po-search.component';

describe('PoSearchComponent', () => {
  let component: PoSearchComponent;
  let fixture: ComponentFixture<PoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
