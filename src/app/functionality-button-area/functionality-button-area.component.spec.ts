import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityButtonAreaComponent } from './functionality-button-area.component';

describe('FunctionalityButtonAreaComponent', () => {
  let component: FunctionalityButtonAreaComponent;
  let fixture: ComponentFixture<FunctionalityButtonAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalityButtonAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalityButtonAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
