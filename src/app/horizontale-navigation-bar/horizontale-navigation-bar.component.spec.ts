import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontaleNavigationBarComponent } from './horizontale-navigation-bar.component';

describe('HorizontaleNavigationBarComponent', () => {
  let component: HorizontaleNavigationBarComponent;
  let fixture: ComponentFixture<HorizontaleNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontaleNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontaleNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
