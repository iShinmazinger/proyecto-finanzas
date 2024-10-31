import { TestBed } from '@angular/core/testing';

import { CrearfacturaService } from './crearfactura.service';

describe('CrearfacturaService', () => {
  let service: CrearfacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearfacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
