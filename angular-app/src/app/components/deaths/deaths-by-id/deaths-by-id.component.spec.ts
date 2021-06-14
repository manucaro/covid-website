import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsByIdComponent } from './deaths-by-id.component';

describe('DeathsByIdComponent', () => {
  let component: DeathsByIdComponent;
  let fixture: ComponentFixture<DeathsByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathsByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
