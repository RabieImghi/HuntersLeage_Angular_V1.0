import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';  
import { SpeciesServiceService } from '../../service/species-service.service';
import { FooterComponent } from '../../front-student/footer/footer.component';

interface Species {
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;
  points: number;
  hunted: number;
}
@Component({
  selector: 'app-speceis',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './speceis.component.html'
})
export class SpeceisComponent {

  speciesList: any = [];
  page: number = 0;
  size: number = 10;
  totalElements = 0;
  isDataLoading = false;
  searchName: string = '';
  isDataEmpty = false;

  constructor(private speciesServiceService: SpeciesServiceService) { }

  ngOnInit() {
    this.getSpecies();
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }
  

  getSpecies(): void {
    this.speciesServiceService.getSpeciesList(this.page, this.size)
    .subscribe(
      (response)=>{
        this.speciesList = response.content;
        this.totalElements = response.totalElements;
        this.isDataLoading = true;
        if(this.speciesList.length === 0) {
          this.isDataEmpty = true;
        }else this.isDataEmpty = false;
      },
      (error)=>{
        console.error('Error fetching species list:', error);
      }
    );
  }
  loadSpecies(): void {
    this.isDataLoading = false;
    if(this.searchName) {
      this.speciesServiceService.searchSpecies(this.searchName, this.page, this.size)
      .subscribe(
        (response)=>{
          this.speciesList = response.content;
          this.totalElements = response.totalElements;
          this.isDataLoading = true;
          if(this.speciesList.length === 0) {
            this.isDataEmpty = true;
          }else this.isDataEmpty = false;
        },
        (error)=>{
          console.error('Error fetching species list:', error);
        }
      );
    }else this.getSpecies();
  }
  onPageChange(newPage: number): void {
    this.isDataLoading = false;
    this.page = newPage;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.getSpecies(); 
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
}
