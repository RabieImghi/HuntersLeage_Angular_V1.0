import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-hunt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-hunt.component.html'
})
export class UpdateHuntComponent {

  @Input() hunt: any;

}
