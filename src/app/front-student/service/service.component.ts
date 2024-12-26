import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';


interface Service {
  title: string;
  description: string;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html'
})
export class ServiceComponent {

  services: Service[] = [
    {
      title: 'Different Competition',
      description: 'Various types of competitions tailored for different skills and expertise.'
    },
    {
      title: 'Different Species',
      description: 'Explore a diverse range of species in various wilderness locations.'
    },
    {
      title: '3 Winners',
      description: 'Top three winners in each competition receive exclusive rewards.'
    },
    {
      title: 'Community Support',
      description: 'Join a supportive community of like-minded hunters.'
    }
  ];

  ngAfterViewInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

}
