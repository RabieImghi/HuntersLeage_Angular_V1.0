import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { SpeciesServiceService } from '../../../../service/species-service.service';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-delete-species',
  standalone: true,
  imports: [],
  templateUrl: './delete-species.component.html'
})
export class DeleteSpeciesComponent {

  @Input() specie: any;

  constructor(private speciesService: SpeciesServiceService, private computationService: ComputationService) { }

  
  deleteSpecie() {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete specie with Nme: ${this.specie.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.speciesService.deleteSpecies(this.specie.id)
        .subscribe(
          ()=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'The Species has been deleted with success.',
              showConfirmButton: false,
              timer: 1500
            });
            this.computationService.triggerRefresh();
          },
          (error)=>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              text: 'Error on delete Species: ' + error.error,
              showConfirmButton: false,
              timer: 50500
            });
          
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The specie is safe :)', 'info');
      }
    });
  }

}
