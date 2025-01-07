import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompetitionsComponent } from '../CRUD/competitions/create-competitions/create-competitions.component';
import { DeleteCompetitionsComponent } from '../CRUD/competitions/delete-competitions/delete-competitions.component';
import { UpdateCompetitionsComponent } from '../CRUD/competitions/update-competitions/update-competitions.component';
import { CompitetionServiceService } from '../../service/compitetion-service.service';
import { ComputationService } from '../../service/shared/computation.service';
import { FormsModule } from '@angular/forms';
import { TokenStorageServiceService } from '../../service/token-storage-service.service';

interface CompetitionResponseVm {
  id: string;
  code: string;
  location: string;
  date: string;
  speciesType: string;
  minParticipants: number;
  maxParticipants: number;
  openRegistration: boolean;
}

@Component({
  selector: 'app-manage-competitions',
  standalone: true,
  imports: [CommonModule,FormsModule, CreateCompetitionsComponent, DeleteCompetitionsComponent, UpdateCompetitionsComponent],  
  templateUrl: './manage-competitions.component.html'
})


export class ManageCompetitionsComponent {


  constructor(private compitetionServiceService: CompitetionServiceService,private computationService: ComputationService) { }

  
  isDataLoading = false;
  competitions: any = [];
  totalElements = 0;
  page = 0;
  size = 10;
  searchCode: string = '';

  getCompetitions(): void {
    this.compitetionServiceService.getCompitetionList(this.page, this.size)
    .subscribe(
      (response) => {
        this.competitions = response.content;
        this.totalElements = response.totalElements;
        this.isDataLoading = true;
      },
      (error) => {
        console.error('Error fetching competition list:', error);
      }
    );

    console.log(this.competitions);
  }

  ngOnInit(): void {
    this.getCompetitions();
    this.computationService.refreshComput$.subscribe(() => {
      this.getCompetitions();
    });
   
  }
  loadCompetiton(): void {
    this.isDataLoading = false;
    if(this.searchCode) {
      this.compitetionServiceService.getCompitetionListByCode(this.searchCode, this.page, this.size)
      .subscribe(
        (response) => {
          this.competitions = response.content;
          this.totalElements = response.totalElements;
          this.isDataLoading = true;
        },
        (error) => {
          console.error('Error fetching competition list:', error);
        }
      );
    } else {
      this.getCompetitions();
    }
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
  

 
}
