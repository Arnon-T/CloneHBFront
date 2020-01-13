import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPeriodoComponent } from './cadastrar-periodo.component';

describe('CadastrarPeriodoComponent', () => {
  let component: CadastrarPeriodoComponent;
  let fixture: ComponentFixture<CadastrarPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
