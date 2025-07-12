import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { IngredientScannerComponent } from './app/ingredient-scanner/ingredient-scanner.component';

bootstrapApplication(IngredientScannerComponent, appConfig)
  .catch((err) => console.error(err));
