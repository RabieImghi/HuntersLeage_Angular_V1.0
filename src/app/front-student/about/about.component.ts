import { Component, ViewChild, ElementRef   } from '@angular/core';
import AOS from 'aos';
import { CommonModule } from '@angular/common';
import { TokenStorageServiceService } from '../../service/token-storage-service.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  constructor(private tokenService: TokenStorageServiceService) { }
  ngAfterViewInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  playVideo(): void {
    this.videoPlayer.nativeElement.play();
  }

  getToken(): string | null{
    return this.tokenService.getToken();
  }

 
}
