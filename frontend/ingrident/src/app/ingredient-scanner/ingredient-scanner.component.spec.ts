import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientScannerComponent } from './ingredient-scanner.component';

describe('IngredientScannerComponent', () => {
  let component: IngredientScannerComponent;
  let fixture: ComponentFixture<IngredientScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientScannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
