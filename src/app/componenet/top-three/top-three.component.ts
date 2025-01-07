import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { FormsModule } from '@angular/forms';
import { ParticipationService } from '../../service/participation.service';
import { FooterComponent } from '../../front-student/footer/footer.component';

@Component({
  selector: 'app-top-three',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './top-three.component.html'
})
export class TopThreeComponent {

  constructor(private participationService: ParticipationService) { }

  users: any = [];
  isDataLoading = false;
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
          this.isDataLoading = true;
        },
        (error) => {
          console.error('Error fetching top three users:', error);
        }
      );
  }
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
