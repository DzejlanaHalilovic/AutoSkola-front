import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreirajrasporedComponent } from './kreirajraspored.component';

describe('KreirajrasporedComponent', () => {
  let component: KreirajrasporedComponent;
  let fixture: ComponentFixture<KreirajrasporedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreirajrasporedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KreirajrasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
