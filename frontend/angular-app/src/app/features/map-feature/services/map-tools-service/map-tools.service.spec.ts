import { TestBed } from '@angular/core/testing';

import { MapToolsService } from './map-tools.service';

describe('MapToolsService', () => {
  let service: MapToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
