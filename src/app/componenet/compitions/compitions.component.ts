import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

interface Competition {
  code: string;
  location: string;
  date: string; 
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean;
}

@Component({
  selector: 'app-compitions',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './compitions.component.html'
})
export class CompitionsComponent {


  ngOnInit() {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      });
    }
  competitions: Competition[] = [
    {
      code: 'CMP-001',
      location: 'New Hyde, 11040',
      date: '2024-02-05T08:00:00',
      speciesType: 'Mammals',
      minParticipants: 10,
      maxParticipants: 50,
      openRegistration: true,
    },
    {
      code: 'CMP-002',
      location: 'Central Park, NYC',
      date: '2024-03-10T10:00:00',
      speciesType: 'Birds',
      minParticipants: 5,
      maxParticipants: 30,
      openRegistration: false,
    },
    {
      code: 'CMP-003',
      location: 'Golden Gate, SF',
      date: '2024-04-15T09:00:00',
      speciesType: 'Reptiles',
      minParticipants: 8,
      maxParticipants: 40,
      openRegistration: true,
    },
    {
      code: 'CMP-004',
      location: 'Blue Ridge, NC',
      date: '2024-05-20T07:00:00',
      speciesType: 'Amphibians',
      minParticipants: 15,
      maxParticipants: 60,
      openRegistration: true,
    },
    {
      code: 'CMP-005',
      location: 'Yellowstone, WY',
      date: '2024-06-25T06:00:00',
      speciesType: 'Insects',
      minParticipants: 20,
      maxParticipants: 80,
      openRegistration: false,
    },
  ];
}
