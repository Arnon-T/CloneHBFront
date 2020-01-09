import { TestBed } from '@angular/core/testing';

import { CadastroVagaInfoService } from './cadastro-vaga-info.service';

describe('CadastroVagaInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroVagaInfoService = TestBed.get(CadastroVagaInfoService);
    expect(service).toBeTruthy();
  });
});
