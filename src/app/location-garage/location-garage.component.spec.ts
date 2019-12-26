import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGarageComponent } from './location-garage.component';

describe('LocationGarageComponent', () => {
  let component: LocationGarageComponent;
  let fixture: ComponentFixture<LocationGarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGarageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
