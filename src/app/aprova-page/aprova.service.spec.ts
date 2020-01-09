import { TestBed } from '@angular/core/testing';

import { AprovaService } from './aprova.service';

describe('AprovaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprovaService = TestBed.get(AprovaService);
    expect(service).toBeTruthy();
  });
});
