import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { ServiceComponent } from '../service/service.component';
import { AboutComponent } from '../about/about.component';
import { CountdownTimerComponent } from '../footer/countdown-timer/countdown-timer.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ServiceComponent, AboutComponent, CountdownTimerComponent, TestimonialsComponent, FooterComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {

  backgroundImage: string = 'assets/body2.jpg';
  gifImage: string = 'assets/slide.png';


  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

}
