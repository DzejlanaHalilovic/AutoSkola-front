import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodelaAutaComponent } from './dodela-auta.component';

describe('DodelaAutaComponent', () => {
  let component: DodelaAutaComponent;
  let fixture: ComponentFixture<DodelaAutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodelaAutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodelaAutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
