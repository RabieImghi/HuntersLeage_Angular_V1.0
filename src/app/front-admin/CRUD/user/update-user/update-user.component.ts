import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent {

  @Input() user: any;

  isModalOpen: boolean = false;
  toggleModal(state: boolean) {
    this.isModalOpen = state;
  }

  role = [
    { value: 'MEMBER'},
    { value: 'JURY'},
    { value: 'ADMIN'},
  ];

 
}
