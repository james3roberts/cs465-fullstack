import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDataComponent } from './trip-data.component';

describe('TripDataComponent', () => {
  let component: TripDataComponent;
  let fixture: ComponentFixture<TripDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
