import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';


describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;

    component.movie = {
      Poster: 'test.jpg',
      Title: 'Test Movie',
      Year: '2025',
      Runtime: '120 minutes',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render poster', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('test.jpg');
    expect(img.alt).toBe('Test Movie');
  });

  it('should render title and info', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Test Movie');
    const info = fixture.nativeElement.querySelector('.movie-info p');
    expect(info).toBeTruthy();
    expect(info.textContent).toContain('2025');
    expect(info.textContent).toContain('120 minutes');
  });

  it('should show no-poster block if Poster is missing', () => {
    component.movie = {
      Poster: '',
      Title: 'No Poster Movie',
      Year: '2024',
      Runtime: '90 minutes',
    };
    fixture.detectChanges();
    const noPoster = fixture.nativeElement.querySelector('.no-poster');
    expect(noPoster).toBeTruthy();
    expect(noPoster.textContent).toContain('No image');
  });
});
