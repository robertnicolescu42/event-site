import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePosterComponent } from './simple-poster.component';

describe('SimplePosterComponent', () => {
  let component: SimplePosterComponent;
  let fixture: ComponentFixture<SimplePosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplePosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
