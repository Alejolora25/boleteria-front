import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBoletaComponent } from './editar-boleta.component';

describe('EditarBoletaComponent', () => {
  let component: EditarBoletaComponent;
  let fixture: ComponentFixture<EditarBoletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBoletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
