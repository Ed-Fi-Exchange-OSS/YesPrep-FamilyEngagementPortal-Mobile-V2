import { PreloaderService } from './../../../services/preloader/preloader.service';
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent {

  isLoading: boolean;
  constructor(private preloaderService: PreloaderService, private ngZone: NgZone) {

    this.preloaderService.isLoading.subscribe(data => {
      this.ngZone.run(() => { this.isLoading = data });
    });
  }
}
