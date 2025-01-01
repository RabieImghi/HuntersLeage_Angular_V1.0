import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-user.component.html'
})
export class DetailUserComponent {

 @Input() user: any;

 isModalOpen = false;

 toggleModal(state: boolean): void {
   this.isModalOpen = state;
 }
}
