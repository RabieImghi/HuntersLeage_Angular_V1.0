import { Component, Input, input } from '@angular/core';
import Swal from 'sweetalert2';
import { CompitetionServiceService } from '../../../../service/compitetion-service.service'; 
import { ComputationService } from '../../../../service/shared/computation.service';
import { TokenStorageServiceService } from '../../../../service/token-storage-service.service';

@Component({
  selector: 'app-delete-competitions',
  standalone: true,
  imports: [ ],
  templateUrl: './delete-competitions.component.html'
})
export class DeleteCompetitionsComponent {
  @Input() competition: any;

  constructor(private compitetionServiceService: CompitetionServiceService, private computationService: ComputationService,
    private tokenStorageService: TokenStorageServiceService
  ) { }

  deleteCompetition() {
    if(this.tokenStorageService.getSub() === 'jury_test'){
      Swal.fire({
        icon: 'error',
        title: 'You are not allowed to delete competition',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
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
            this.compitetionServiceService.deleteCompetition(this.competition.id)
            .subscribe(
              (response)=>{
                Swal.fire('Deleted!', 'The competition has been deleted.', 'success');
                this.computationService.triggerRefresh();
              },
              (error)=>{
                console.error('Error deleting competition:', error);
                
                Swal.fire('Eroor!', 'Error on deletig competition.', 'error');
              }
            )
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'The competition is safe :)', 'info');
          }
        });
    }
 
  }
}
