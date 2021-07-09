import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprimissoFormComponent } from './comprimisso-form.component';

describe('ComprimissoFormComponent', () => {
  let component: ComprimissoFormComponent;
  let fixture: ComponentFixture<ComprimissoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprimissoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprimissoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
