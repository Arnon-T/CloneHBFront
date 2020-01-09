import { TestBed } from '@angular/core/testing';

import { InformacoesLocatarioService } from './informacoes-locatario.service';

describe('InformacoesLocatarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacoesLocatarioService = TestBed.get(InformacoesLocatarioService);
    expect(service).toBeTruthy();
  });
});
