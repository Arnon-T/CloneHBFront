import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTermComponent } from './rental-term.component';

describe('RentalTermComponent', () => {
  let component: RentalTermComponent;
  let fixture: ComponentFixture<RentalTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentalTermComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
