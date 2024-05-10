import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAllComponent } from './header-all.component';

describe('HeaderAllComponent', () => {
  let component: HeaderAllComponent;
  let fixture: ComponentFixture<HeaderAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
