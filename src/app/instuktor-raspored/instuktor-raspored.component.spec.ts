import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstuktorRasporedComponent } from './instuktor-raspored.component';

describe('InstuktorRasporedComponent', () => {
  let component: InstuktorRasporedComponent;
  let fixture: ComponentFixture<InstuktorRasporedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstuktorRasporedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstuktorRasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
