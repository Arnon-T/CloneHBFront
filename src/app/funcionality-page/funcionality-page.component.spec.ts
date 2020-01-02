import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionalityPageComponent } from './funcionality-page.component';

describe('FuncionalityPageComponent', () => {
  let component: FuncionalityPageComponent;
  let fixture: ComponentFixture<FuncionalityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionalityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionalityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
