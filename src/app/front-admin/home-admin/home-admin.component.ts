import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './home-admin.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HomeAdminComponent {

  menuState = 'in';
  backdropState = 'hidden'; 
  isMobile = false; 

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.menuState = 'out';
      } else {
        this.isMobile = false;
        this.menuState = 'in'; 
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
      this.backdropState = this.menuState === 'in' ? 'visible' : 'hidden';
    }
  }

  closeMenu() {
    if (this.isMobile) {
      this.menuState = 'out';
      this.backdropState = 'hidden';
    }
  }

  menuItems = [
    { name: 'Analytics', icon: 'analytics' },
    { name: 'Competitions', icon: 'emoji_events' },
    { name: 'Hunts', icon: 'track_changes' },
    { name: 'Species', icon: 'pets' },
    { name: 'Participations', icon: 'assignment_turned_in' },
    { name: 'Users', icon: 'group' },
  ];

}
