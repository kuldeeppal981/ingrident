
import { RouterOutlet } from '@angular/router';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  html5QrCode!: Html5Qrcode;
  config = { fps: 10, qrbox: 300 };
  currentIndex: number = 0;
  currentCamera: string | null = null;
  title = 'ingredient';

  ngAfterViewInit(): void {
    this.html5QrCode = new Html5Qrcode("reader");
    this.changeCamera().then((newCameraId) => {
      this.currentCamera = newCameraId;
    });

    document.getElementById("startButton")?.addEventListener("click", () => this.toggleScan());
    document.getElementById("changeCamera")?.addEventListener("click", () => this.switchCamera());
  }

  ngOnDestroy(): void {
    this.html5QrCode?.stop().catch(console.error);
  }
  async changeCamera(): Promise<string> {
    const cameras: { id: string; label: string }[] = await Html5Qrcode.getCameras();
    if (cameras && cameras.length > 1) {
      this.currentIndex = this.currentIndex ? 0 : 1;
    } else {
      this.currentIndex = 0;
    }
    return cameras[this.currentIndex].id;
  }
  

  qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
    const info = document.getElementById("info");
    if (info) {
      info.querySelector("span")!.innerText = decodedText;
      info.style.display = "block";
    }
  };

  toggleScan(): void {
    const button = document.getElementById("startButton") as HTMLButtonElement;
    const changeBtn = document.getElementById("changeCamera");

    if (this.html5QrCode.getState() === Html5QrcodeScannerState.SCANNING) {
      this.html5QrCode.stop().then(() => {
        button.textContent = "Start scanning";
        button.style.background = "#34bb6f";
        if (changeBtn) changeBtn.style.display = "none";
      });
    } else if (this.currentCamera) {
      this.html5QrCode.start(this.currentCamera, this.config, this.qrCodeSuccessCallback, (errorMessage) => {});
      button.textContent = "Stop scan";
      button.style.background = "#e34242";

      document.getElementById("info")!.style.display = "none";
      if (changeBtn) changeBtn.style.display = "inline-block";
    }
  }

  switchCamera(): void {
    this.html5QrCode.stop().then(() => {
      this.changeCamera().then((newCameraId) => {
        this.currentCamera = newCameraId;
        this.html5QrCode.start(this.currentCamera, this.config, this.qrCodeSuccessCallback, (errorMessage) => {});
      });
    });
  }
}
