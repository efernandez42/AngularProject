import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPageComponent } from './detail-page.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'app/core/services/olympic.service';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let mockOlympicService: jasmine.SpyObj<OlympicService>;

  beforeEach(() => {
    mockOlympicService = jasmine.createSpyObj('OlympicService', ['getOlympicById']);

    TestBed.configureTestingModule({
      declarations: [DetailPageComponent],
      providers: [
        { provide: OlympicService, useValue: mockOlympicService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  return '1'; // Remplacez '1' par l'ID que vous voulez tester
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch olympic data on init', () => {
    const mockOlympicData = {
      id: 1,
      country: 'Test Country',
      participations: [
        { id: 1, year: 2020, city: 'Tokyo', medalsCount: 10, athleteCount: 100 },
      ],
    };

    mockOlympicService.getOlympicById.and.returnValue(of(mockOlympicData));
    component.ngOnInit();
    
    component.olympic$.subscribe((data) => {
      expect(data).toEqual(mockOlympicData);
    });
  });
});
