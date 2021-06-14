import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthZonesComponent } from './health-zones.component';

describe('HealthZonesComponent', () => {
  let component: HealthZonesComponent;
  let fixture: ComponentFixture<HealthZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
