import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompetitionsComponent } from '../CRUD/competitions/create-competitions/create-competitions.component';
import { DeleteCompetitionsComponent } from '../CRUD/competitions/delete-competitions/delete-competitions.component';
import { UpdateCompetitionsComponent } from '../CRUD/competitions/update-competitions/update-competitions.component';
import { CompitetionServiceService } from '../../service/compitetion-service.service';

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
  imports: [CommonModule, CreateCompetitionsComponent, DeleteCompetitionsComponent, UpdateCompetitionsComponent],  
  templateUrl: './manage-competitions.component.html'
})


export class ManageCompetitionsComponent {


  constructor(private compitetionServiceService: CompitetionServiceService) { }

  
  competitions: any = [];
  totalElements = 0;
  page = 0;
  size = 10;

  getCompetitions(): void {
    this.compitetionServiceService.getCompitetionList(this.page, this.size)
    .subscribe(
      (response) => {
        this.competitions = response.content;
        this.totalElements = response.totalElements;
      },
      (error) => {
        console.error('Error fetching competition list:', error);
      }
    );

    console.log(this.competitions);
  }

  ngOnInit(): void {
    this.getCompetitions();
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getCompetitions();
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
  

 
}
