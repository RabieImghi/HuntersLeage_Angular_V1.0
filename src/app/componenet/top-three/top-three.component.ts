import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { FormsModule } from '@angular/forms';
import { ParticipationService } from '../../service/participation.service';

@Component({
  selector: 'app-top-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-three.component.html'
})
export class TopThreeComponent {

  constructor(private participationService: ParticipationService) { }

  users: any = [];
  counter: number = 0;
  ngOnInit() {
    this.getTopThree();
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  getTopThree(): void {
    this.participationService.getTop3Users()
      .subscribe(
        (response) => {
          this.users = response;
          console.log('Top three users:', this.users);
        },
        (error) => {
          console.error('Error fetching top three users:', error);
        }
      );
  }
  
  // users = [
  //   {
  //     user: {
  //       id: '123e4567-e89b-12d3-a456-426614174000',
  //       username: '01',
  //       email: 'hunter001@example.com',
  //       role: 'Player',
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       cin: 'CIN123456',
  //       nationality: 'American',
  //       licenseExpirationDate: '2024-12-31T00:00:00',
  //       joinDate: '2021-01-01T00:00:00',
  //     },
  //     competitions: [
  //       {
  //         id: 'c1',
  //         code: 'COMP001',
  //         location: 'New York',
  //         date: '2023-06-15T10:00:00',
  //         score: 95.5,
  //         listHunt: [{}, {}],
  //       },
  //       {
  //         id: 'c2',
  //         code: 'COMP002',
  //         location: 'Los Angeles',
  //         date: '2023-09-10T14:00:00',
  //         score: 88.0,
  //         listHunt: [{}, {}, {},{}, {}, {}],
  //       },
  //     ],
  //   },
  //   {
  //     user: {
  //       id: '123e4567-e89b-12d3-a456-426614174001',
  //       username: '02',
  //       email: 'hunter002@example.com',
  //       role: 'Player',
  //       firstName: 'Jane',
  //       lastName: 'Smith',
  //       cin: 'CIN654321',
  //       nationality: 'British',
  //       licenseExpirationDate: '2025-06-30T00:00:00',
  //       joinDate: '2022-02-15T00:00:00',
  //     },
  //     competitions: [
  //       {
  //         id: 'c3',
  //         code: 'COMP003',
  //         location: 'London',
  //         date: '2023-07-20T12:00:00',
  //         score: 93.0,
  //         listHunt: [{}, {}, {},{}, {}, {},{}, {}, {}],
  //       },
  //       {
  //         id: 'c4',
  //         code: 'COMP004',
  //         location: 'Paris',
  //         date: '2023-08-05T16:00:00',
  //         score: 89.5,
  //         listHunt: [{}, {}, {},{}, {}],
  //       },
  //     ],
  //   },
  //   {
  //     user: {
  //       id: '123e4567-e89b-12d3-a456-426614174002',
  //       username: '03',
  //       email: 'hunter003@example.com',
  //       role: 'Player',
  //       firstName: 'Emily',
  //       lastName: 'Taylor',
  //       cin: 'CIN789012',
  //       nationality: 'Canadian',
  //       licenseExpirationDate: '2026-03-20T00:00:00',
  //       joinDate: '2020-09-10T00:00:00',
  //     },
  //     competitions: [
  //       {
  //         id: 'c5',
  //         code: 'COMP005',
  //         location: 'Toronto',
  //         date: '2023-05-25T09:00:00',
  //         score: 92.0,
  //         listHunt: [{}, {}, {}],
  //       },
  //       {
  //         id: 'c6',
  //         code: 'COMP006',
  //         location: 'Vancouver',
  //         date: '2023-10-15T11:00:00',
  //         score: 90.0,
  //         listHunt: [{}, {}, {},{}, {}, {},{}, {}],
  //       },
  //     ],
  //   },
  // ];

  getCounter(): number {
    return ++this.counter;
  }
  calculateHunted(user: any): number {
    return user.competitions.reduce(
      (total : number, comp: any) => total + comp.listHunt.length || 0, 0
    )
  }  
  calculateTotalScore(user: any): number {
    return user.competitions.reduce(
      (total : number, comp: any) => total + comp.score || 0, 0
    );
  }
  
}
