import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-update-competitions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-competitions.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'scale(0)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class UpdateCompetitionsComponent {

  @Input() competition: any;

  competitionTypes = [
    { value: 'SEA', label: 'SEA (9)' },
    { value: 'BIG_GAME', label: 'BIG GAME (3)' },
    { value: 'BIRD', label: 'BIRD (5)' },
  ];
  isModalOpenUpdate = false;

  toggleModalUpdate(state: boolean): void {
    this.isModalOpenUpdate = state;
  }
}
