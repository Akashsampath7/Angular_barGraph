import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseBarComponent } from './response-bar.component';

describe('ResponseBarComponent', () => {
  let component: ResponseBarComponent;
  let fixture: ComponentFixture<ResponseBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
