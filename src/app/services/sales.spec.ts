import { TestBed } from '@angular/core/testing';

import { Sales } from './sales';

describe('Sales', () => {
  let service: Sales;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sales);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
