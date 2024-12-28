import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-hunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-hunt.component.html'
})
export class DeleteHuntComponent {

  @Input() hunt: any;

  
    deleteHunt() {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete hunt with ID: ${this.hunt.id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'The hunt has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'The hunt is safe :)', 'info');
        }
      });
    }
}
