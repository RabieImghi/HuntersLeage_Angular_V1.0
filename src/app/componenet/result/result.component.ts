import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationService } from '../../service/participation.service';
import { FooterComponent } from '../../front-student/footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './result.component.html'
})
export class ResultComponent {

  userHistoricResponse: any = {};
  isDataLoading = false;
  isUserHistoricEmpty = false;
  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.getUserHistoric();
  }
  getUserHistoric(): void {
    this.participationService.getMyResults()
      .subscribe(
        (response) => {
          this.userHistoricResponse = response;
          console.log('User historic:', this.userHistoricResponse);
          this.isDataLoading = true;
        },
        (error) => {
          if(error.status === 400) {
            this.isUserHistoricEmpty = true;
            this.isDataLoading = true;
          }
          console.error('Error fetching user historic:', error);
        }
      );
  }

}
