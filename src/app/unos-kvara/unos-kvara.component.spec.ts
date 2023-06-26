import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosKvaraComponent } from './unos-kvara.component';

describe('UnosKvaraComponent', () => {
  let component: UnosKvaraComponent;
  let fixture: ComponentFixture<UnosKvaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosKvaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosKvaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
