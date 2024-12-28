import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {
  isModalOpen: boolean = false;
  toggleModal(state: boolean) {
    this.isModalOpen = state;
  }

  
}
