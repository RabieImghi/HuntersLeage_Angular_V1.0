import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import Swal from 'sweetalert2';
import { CompitetionServiceService } from '../../service/compitetion-service.service';
import { ParticipationService } from '../../service/participation.service';
import { FooterComponent } from '../../front-student/footer/footer.component';

interface createCompetition {
  competitionId: string;
}
@Component({
  selector: 'app-compitions',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './compitions.component.html'
})
export class CompitionsComponent {
  competitions: any = [];
  totalElements = 0;
  page: number = 0;
  size: number = 10;
  isDataLoading = false;
  isParticipating = false;
  searchCode: string = '';
  isDataEmpty = false;

  constructor(private compitetionServiceService: CompitetionServiceService, private partcipationService: ParticipationService) { }

  ngOnInit() {
    this.getCompetitions();
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  getCompetitions(): void {
    this.compitetionServiceService.getCompitetionList(this.page, this.size)
    .subscribe(
      (response)=>{
        this.competitions = response.content;
        this.totalElements = response.totalElements;
        this.isDataLoading = true;
        if(this.competitions.length === 0) {
          this.isDataEmpty = true;
        }else this.isDataEmpty = false;
      }
    );
  }
  onPageChange(newPage: number): void {
    this.isDataLoading = false;
    this.page = newPage;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.getCompetitions();
    
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
  onParticipate(competition: any): void {
    this.isParticipating = true;
    const participation: createCompetition = {
      competitionId: competition.id
    }
    this.partcipationService.createParticipation(participation)
    .subscribe(
      (response)=>{
        this.successParticipation();
        this.isParticipating = false;
      },
      (error)=>{
        this.errorParticipation(error.error);
        this.isParticipating = false;
      }
    )
  }
  loadCompetitionByCode(): void {
    this.isDataLoading = false;
    if (this.searchCode.trim()) {
      this.compitetionServiceService.getCompitetionListByCode(this.searchCode, this.page, this.size)
      .subscribe(
        (response)=>{
          this.competitions = response.content;
          this.totalElements = response.totalElements;
          this.isDataLoading = true;
          if(this.competitions.length === 0) {
            this.isDataEmpty = true;
          }else this.isDataEmpty = false;
        }
    );
    } else {
      this.getCompetitions();
    }


    

  }
  successParticipation() {
     Swal.fire({
        position: 'top-end', 
        icon: 'success',
        title: 'You have successfully participated in the competition!',
        showConfirmButton: false, 
        timer: 3500, 
        toast: true, 
        timerProgressBar: true,
      });
  }
  errorParticipation(error: string) {
    Swal.fire({
      position: 'top-end', 
      icon: 'error',
      title: 'Error participating in the competition : ' + error,
      showConfirmButton: false, 
      timer: 3500, 
      toast: true, 
      timerProgressBar: true,
    });
  }

}
