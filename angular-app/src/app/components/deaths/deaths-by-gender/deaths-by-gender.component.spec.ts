import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathsByGenderComponent } from './deaths-by-gender.component';

describe('DeathsByGenderComponent', () => {
  let component: DeathsByGenderComponent;
  let fixture: ComponentFixture<DeathsByGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathsByGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathsByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
