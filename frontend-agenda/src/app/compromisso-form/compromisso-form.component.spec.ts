import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoFormComponent } from './compromisso-form.component';

describe('CompromissoFormComponent', () => {
  let component: CompromissoFormComponent;
  let fixture: ComponentFixture<CompromissoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompromissoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
