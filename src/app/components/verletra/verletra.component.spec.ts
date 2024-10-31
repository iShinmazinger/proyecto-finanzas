import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerletraComponent } from './verletra.component';

describe('VerletraComponent', () => {
  let component: VerletraComponent;
  let fixture: ComponentFixture<VerletraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerletraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerletraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
