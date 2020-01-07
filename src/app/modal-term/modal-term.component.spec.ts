import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermComponent } from './modal-term.component';

describe('ModalTermComponent', () => {
  let component: ModalTermComponent;
  let fixture: ComponentFixture<ModalTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
