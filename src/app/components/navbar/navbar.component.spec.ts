import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('Navbar', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render logo', () => {
    const logo = fixture.nativeElement.querySelector('.logo');
    expect(logo).toBeTruthy();
    expect(logo.textContent).toContain('MovieFinder');
  });
  it('should render search input', () => {
    const input = fixture.nativeElement.querySelector('input[tuiTextfield]');
    expect(input).toBeTruthy();
  });
  it('should render user avatar', () => {
    const avatar = fixture.nativeElement.querySelector('tui-avatar');
    expect(avatar).toBeTruthy();
  });
  it('should update value when input changes', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[tuiTextfield]');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.value).toBe('test');
  });

});
