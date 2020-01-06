import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovaPageComponent } from './aprova-page.component';

describe('AprovaPageComponent', () => {
  let component: AprovaPageComponent;
  let fixture: ComponentFixture<AprovaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprovaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
