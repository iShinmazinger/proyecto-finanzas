import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearletraComponent } from './crearletra.component';

describe('CrearletraComponent', () => {
  let component: CrearletraComponent;
  let fixture: ComponentFixture<CrearletraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearletraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearletraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
