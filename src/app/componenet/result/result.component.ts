import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationService } from '../../service/participation.service';


@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html'
})
export class ResultComponent {

  userHistoricResponse: any = {};
  isDataLoading = false;
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
          console.error('Error fetching user historic:', error);
        }
      );
  }

}
