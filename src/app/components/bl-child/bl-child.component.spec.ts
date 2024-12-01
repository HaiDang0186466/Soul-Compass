import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlChildComponent } from './bl-child.component';

describe('BlChildComponent', () => {
  let component: BlChildComponent;
  let fixture: ComponentFixture<BlChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
