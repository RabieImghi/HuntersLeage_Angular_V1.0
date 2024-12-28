import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [],
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent {

  @Input() user: any;
}
