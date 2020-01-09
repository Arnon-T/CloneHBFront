import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaInfoComponent } from './cadastro-vaga-info.component';

describe('CadastroVagaInfoComponent', () => {
  let component: CadastroVagaInfoComponent;
  let fixture: ComponentFixture<CadastroVagaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVagaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVagaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
