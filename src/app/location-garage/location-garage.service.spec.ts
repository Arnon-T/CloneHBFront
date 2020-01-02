import { TestBed } from '@angular/core/testing';

import { LocationGarageService } from './location-garage.service';

describe('LocationGarageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationGarageService = TestBed.get(LocationGarageService);
    expect(service).toBeTruthy();
  });
});
