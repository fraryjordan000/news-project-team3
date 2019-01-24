import { TestBed } from '@angular/core/testing';

import { ApiFetchService } from './api-fetch.service';

describe('ApiFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFetchService = TestBed.get(ApiFetchService);
    expect(service).toBeTruthy();
  });
});
