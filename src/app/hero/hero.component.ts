import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { ServiceComponent } from '../service/service.component';
import { AboutComponent } from '../about/about.component';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ServiceComponent, AboutComponent],
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
