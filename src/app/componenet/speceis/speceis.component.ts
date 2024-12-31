import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';  
import { SpeciesServiceService } from '../../service/species-service.service';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './speceis.component.html'
})
export class SpeceisComponent {

  speciesList: any = [];
  page: number = 0;
  size: number = 10;
  totalElements = 0;

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
      },
      (error)=>{
        console.error('Error fetching species list:', error);
      }
    );
  }
  onPageChange(newPage: number): void {
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
