import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSpeciesComponent } from '../CRUD/Species/create-species/create-species.component';
import { UpdateSpeciesComponent } from '../CRUD/Species/update-species/update-species.component';
import { DeleteSpeciesComponent } from '../CRUD/Species/delete-species/delete-species.component';
import { SpeciesServiceService } from '../../service/species-service.service';
import { ComputationService } from '../../service/shared/computation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-species',
  standalone: true,
  imports: [CommonModule,FormsModule, CreateSpeciesComponent, UpdateSpeciesComponent, DeleteSpeciesComponent],
  templateUrl: './manage-species.component.html'
})
export class ManageSpeciesComponent {

  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  searchName: string = '';

  constructor(private speciesService: SpeciesServiceService, private computationService: ComputationService) { }

  species: any = [];

  ngOnInit(): void {
    this.loadSpecies();
    this.computationService.refreshComput$.subscribe(() => {
      this.loadSpecies();
    });
  }
  loadSpecies(): void {
    if (this.searchName.trim()) {
      this.search();
    } else {
      this.getSpeciesList(this.page, this.size);
    }
  }


  getSpeciesList(page: number, size: number) {
    this.speciesService.getSpeciesList(page, size).
    subscribe(
      (response)=>{
        this.species = response.content;
        console.log(this.species);
        this.totalElements = response.totalElements;
        
      },
      (error)=>{
        console.log("error : "+error.error)
      }
    );
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadSpecies();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }

  search(){
    if (this.searchName.trim()) {
      this.speciesService.searchSpecies(this.searchName, this.page, this.size)
      .subscribe(
        (response)=>{
          this.species = response.content;
          this.totalElements = response.totalElements;
        },
        (error)=>{
          console.log("error : "+error.error)
        });
    } else {  
      this.getSpeciesList(this.page, this.size);
    }
      
  }
  
}
