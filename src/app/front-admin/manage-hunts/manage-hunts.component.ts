import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHuntComponent } from '../CRUD/hunts/create-hunt/create-hunt.component';
import { DeleteHuntComponent } from '../CRUD/hunts/delete-hunt/delete-hunt.component';
import { UpdateHuntComponent } from '../CRUD/hunts/update-hunt/update-hunt.component';
import { HuntService } from '../../service/hunt.service';
import { ComputationService } from '../../service/shared/computation.service';

@Component({
  selector: 'app-manage-hunts',
  standalone: true,
  imports: [CommonModule,CreateHuntComponent, DeleteHuntComponent, UpdateHuntComponent],
  templateUrl: './manage-hunts.component.html'
})
export class ManageHuntsComponent {

  Hunts: any = [];
  totalElements = 0;
  page = 0;
  size = 10;
  constructor(private huntService: HuntService,private computationService: ComputationService) { }

  ngOnInit(): void {
    this.getHunts();
    this.computationService.refreshComput$.subscribe(() => {
      this.getHunts();
    });
  }


  getHunts(): void {
    this.huntService.getHuntList(this.page, this.size)
    .subscribe(
      (response)=>{
        this.Hunts = response.content;
      },
      (error)=>{
        console.error('Error fetching hunts list:', error);
      }
    );
  }
  

  

}
