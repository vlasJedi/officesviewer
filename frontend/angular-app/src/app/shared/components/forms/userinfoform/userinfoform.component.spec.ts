import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoformComponent } from './userinfoform.component';

describe('UserinfoformComponent', () => {
  let component: UserinfoformComponent;
  let fixture: ComponentFixture<UserinfoformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserinfoformComponent]
    });
    fixture = TestBed.createComponent(UserinfoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
