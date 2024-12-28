import { Component, Input, input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-competitions',
  standalone: true,
  imports: [ ],
  templateUrl: './delete-competitions.component.html'
})
export class DeleteCompetitionsComponent {
  @Input() competition: any;

  deleteCompetition() {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete competition with Code: ${this.competition.code}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The competition has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The competition is safe :)', 'info');
      }
    });
  }
}
