import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {

 @Input() user: any;

 
     deleteUser() {
       Swal.fire({
         title: 'Are you sure?',
         text: `Do you really want to delete user with Username: ${this.user.username}?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#3085d6',
         confirmButtonText: 'Yes, delete it!',
         cancelButtonText: 'Cancel',
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire('Deleted!', 'The user has been deleted.', 'success');
         } else if (result.dismiss === Swal.DismissReason.cancel) {
           Swal.fire('Cancelled', 'The user is safe :)', 'info');
         }
       });
     }
}
