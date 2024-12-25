import { Component, ViewChild, ElementRef   } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  ngAfterViewInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  playVideo(): void {
    this.videoPlayer.nativeElement.play();
    // Optionally, hide the play button after playing
    
  }

 
}
