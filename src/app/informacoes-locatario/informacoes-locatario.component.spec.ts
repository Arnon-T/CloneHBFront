import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesLocatarioComponent } from './informacoes-locatario.component';

describe('InformacoesLocatarioComponent', () => {
  let component: InformacoesLocatarioComponent;
  let fixture: ComponentFixture<InformacoesLocatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesLocatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
