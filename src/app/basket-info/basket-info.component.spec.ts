import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketInfoComponent } from './basket-info.component';

describe('BasketInfoComponent', () => {
  let component: BasketInfoComponent;
  let fixture: ComponentFixture<BasketInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
