import { TestBed } from '@angular/core/testing';

import { Branches } from './branches';

describe('Branches', () => {
  let service: Branches;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Branches);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
