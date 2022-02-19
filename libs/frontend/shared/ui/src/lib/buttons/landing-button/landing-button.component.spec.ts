import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingButtonComponent } from './landing-button.component';

describe('LandingButtonComponent', () => {
  let component: LandingButtonComponent;
  let fixture: ComponentFixture<LandingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
