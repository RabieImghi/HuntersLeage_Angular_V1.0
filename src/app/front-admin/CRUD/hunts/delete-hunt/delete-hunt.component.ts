import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HuntService } from '../../../../service/hunt.service';
import { ComputationService } from '../../../../service/shared/computation.service';
import { TokenStorageServiceService } from '../../../../service/token-storage-service.service';

@Component({
  selector: 'app-delete-hunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-hunt.component.html'
})
export class DeleteHuntComponent {

  @Input() hunt: any;

  constructor(private huntService: HuntService, private compulationService: ComputationService, private token: TokenStorageServiceService ) { }

  
    deleteHunt() {
      if(this.token.getSub() === 'jury_test'){
        Swal.fire({
          icon: 'error',
          title: 'You are not allowed to delete hunt',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
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
            this.huntService.deleteHunt(this.hunt.id)
            .subscribe(
              (response)=>{
                this.compulationService.triggerRefresh();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'The hunt has been deleted.',
                    showConfirmButton: false,
                    timer: 1500 
                });
              },
              (error)=>{
                 Swal.fire({
                    position: 'top-end', 
                    icon: 'error',
                    text: 'Error on delete hunt: ' + error.error,
                    showConfirmButton: false,
                    timer: 1500 
                });
              }
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'The hunt is safe :)', 'info');
          }
        });
      }
      
    }
}
