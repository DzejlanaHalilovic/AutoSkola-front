import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolaznikRasporedComponent } from './polaznik-raspored.component';

describe('PolaznikRasporedComponent', () => {
  let component: PolaznikRasporedComponent;
  let fixture: ComponentFixture<PolaznikRasporedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolaznikRasporedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolaznikRasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
