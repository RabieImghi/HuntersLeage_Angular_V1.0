import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-hunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-hunt.component.html'
})
export class DeleteHuntComponent {

  @Input() hunt: any;

}
