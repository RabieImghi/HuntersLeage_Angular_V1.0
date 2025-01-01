import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../../../service/user.service';
import { ComputationService } from '../../../../service/shared/computation.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {

 @Input() user: any;

  constructor(private userService: UserService, private com: ComputationService) { }

 
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
            this.userService.deleteUser(this.user.id).subscribe(
              ()=>{
                Swal.fire({
                  icon: 'success',
                  title: 'User Deleted',
                  text: 'The user has been successfully deleted.',
                  timer: 1500,
                  showConfirmButton: false,
                });
                this.com.triggerRefresh();
              },
              (error)=>{
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'An error occurred while deleting the user.',
                  timer: 1500,
                  showConfirmButton: false,
                });
              }
            );
         } else if (result.dismiss === Swal.DismissReason.cancel) {
           Swal.fire('Cancelled', 'The user is safe :)', 'info');
         }
       });
     }
}
