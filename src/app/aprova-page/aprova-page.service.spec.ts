import { TestBed } from '@angular/core/testing';

import { AprovaPageService } from './aprova-page.service';

describe('AprovaPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprovaPageService = TestBed.get(AprovaPageService);
    expect(service).toBeTruthy();
  });
});
