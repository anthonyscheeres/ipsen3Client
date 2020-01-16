import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationBarComponent } from './vertical-navigation-bar.component';

describe('VerticalNavigationBarComponent', () => {
  let component: VerticalNavigationBarComponent;
  let fixture: ComponentFixture<VerticalNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
