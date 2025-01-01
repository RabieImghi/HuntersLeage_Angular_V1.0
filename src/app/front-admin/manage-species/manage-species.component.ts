import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSpeciesComponent } from '../CRUD/Species/create-species/create-species.component';
import { UpdateSpeciesComponent } from '../CRUD/Species/update-species/update-species.component';
import { DeleteSpeciesComponent } from '../CRUD/Species/delete-species/delete-species.component';
import { SpeciesServiceService } from '../../service/species-service.service';

@Component({
  selector: 'app-manage-species',
  standalone: true,
  imports: [CommonModule, CreateSpeciesComponent, UpdateSpeciesComponent, DeleteSpeciesComponent],
  templateUrl: './manage-species.component.html'
})
export class ManageSpeciesComponent {

  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  constructor(private speciesService: SpeciesServiceService) { }

  species: any = [];


  ngOnInit(): void{
    this.getSpeciesList(this.page,this.size);
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
    this.getSpeciesList(this.page, this.size);
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
  
}
