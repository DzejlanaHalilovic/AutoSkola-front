import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostupnekategorijeComponent } from './dostupnekategorije.component';

describe('DostupnekategorijeComponent', () => {
  let component: DostupnekategorijeComponent;
  let fixture: ComponentFixture<DostupnekategorijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DostupnekategorijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DostupnekategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
