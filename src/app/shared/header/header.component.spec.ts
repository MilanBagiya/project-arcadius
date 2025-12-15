import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu open state', () => {
    expect(component.isMenuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should close menu', () => {
    component.isMenuOpen = true;

    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });
});
