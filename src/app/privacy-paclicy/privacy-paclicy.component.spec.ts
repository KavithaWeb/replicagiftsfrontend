import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPaclicyComponent } from './privacy-paclicy.component';

describe('PrivacyPaclicyComponent', () => {
  let component: PrivacyPaclicyComponent;
  let fixture: ComponentFixture<PrivacyPaclicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPaclicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacyPaclicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
