import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentYear to the current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should initialize lastUpdated as a Date', () => {
    expect(component.lastUpdated instanceof Date).toBeTrue();
  });

  it('should have a version', () => {
    expect(component.version).toBe('1.0.0');
  });
});
