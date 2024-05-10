import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleveryDetailsComponent } from './delevery-details.component';

describe('DeleveryDetailsComponent', () => {
  let component: DeleveryDetailsComponent;
  let fixture: ComponentFixture<DeleveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleveryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
