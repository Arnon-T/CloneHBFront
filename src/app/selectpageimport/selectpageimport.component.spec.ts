import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectpageimportComponent } from './selectpageimport.component';

describe('SelectpageimportComponent', () => {
  let component: SelectpageimportComponent;
  let fixture: ComponentFixture<SelectpageimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectpageimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectpageimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
