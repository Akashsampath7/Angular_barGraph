import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedApiComponent } from './combined-api.component';

describe('CombinedApiComponent', () => {
  let component: CombinedApiComponent;
  let fixture: ComponentFixture<CombinedApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombinedApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombinedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
