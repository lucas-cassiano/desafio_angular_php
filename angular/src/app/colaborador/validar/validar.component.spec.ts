import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarComponent } from './validar.component';

describe('ValidarComponent', () => {
  let component: ValidarComponent;
  let fixture: ComponentFixture<ValidarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarComponent]
    });
    fixture = TestBed.createComponent(ValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
