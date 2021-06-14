import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHealthZoneComponent } from './edit-health-zone.component';

describe('EditHealthZoneComponent', () => {
  let component: EditHealthZoneComponent;
  let fixture: ComponentFixture<EditHealthZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHealthZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHealthZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
