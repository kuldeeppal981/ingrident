import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-scanner',
  templateUrl: './ingredient-scanner.component.html',
  imports: [CommonModule,FormsModule],
  standalone: true,
  styleUrls: ['./ingredient-scanner.component.scss']
})
export class IngredientScannerComponent {
  isLoading = false;
  currentCamera = 'environment'; // or 'user'
  scannedIngredient: any = null;

  startScanning() {
    this.isLoading = true;

    // Simulated result from OCR + ingredient service
    setTimeout(() => {
      this.scannedIngredient = {
        name: 'Sodium Benzoate',
        benefits: ['Preservative', 'Inhibits bacterial growth'],
        harmfulEffects: ['Can cause hyperactivity in children', 'Linked to inflammation'],
        allergens: ['None reported']
      };
      this.isLoading = false;
    }, 2000);
  }

  switchCamera() {
    this.currentCamera = this.currentCamera === 'environment' ? 'user' : 'environment';
    // console.log('Camera switched to:', this.cu rrentCamera);
    // Re-initialize camera capture here
  }
}
