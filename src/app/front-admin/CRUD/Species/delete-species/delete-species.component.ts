import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-delete-species',
  standalone: true,
  imports: [],
  templateUrl: './delete-species.component.html'
})
export class DeleteSpeciesComponent {

  @Input() specie: any;

  
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
        Swal.fire('Deleted!', 'The specie has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The specie is safe :)', 'info');
      }
    });
  }

}
