import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapToolboxComponent } from './map-toolbox.component';

describe('MapToolboxComponent', () => {
  let component: MapToolboxComponent;
  let fixture: ComponentFixture<MapToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapToolboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
