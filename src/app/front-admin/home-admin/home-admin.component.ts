import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, RouterModule, RouterOutlet} from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule, RouterOutlet],
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
  dropdownOpen = false;

 
  menuState = 'in';
  backdropState = 'hidden'; 
  isMobile = false; 
  activeLink = 'Analytics';

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private activatedRoute: ActivatedRoute) {}

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

    this.updateActiveLink(this.router.url);

    this.router.events.subscribe(() => {
      this.updateActiveLink(this.router.url);
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.menuState = this.menuState === 'out' ? 'in' : 'out';
      this.backdropState = this.menuState === 'in' ? 'visible' : 'hidden';
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeMenu() {
    if (this.isMobile) {
      this.menuState = 'out';
      this.backdropState = 'hidden';
    }
  }
  updateActiveLink(url: string) {
    const matchedItem = this.menuItems.find(item => url.includes(item.link));
    this.activeLink = matchedItem ? matchedItem.name : '';
  }

  
  changeActiveLink(link: string){
    this.activeLink = link;
  }

  menuItems = [
    { name: 'Analytics', icon: 'analytics', link: '/admin/analytics' },
    { name: 'Competitions', icon: 'emoji_events', link: '/admin/competitions' },
    { name: 'Hunts', icon: 'track_changes', link: '/admin/hunts' },
    { name: 'Species', icon: 'pets', link: '/admin/species' },
    { name: 'Users', icon: 'group', link: '/admin/users' },
  ];

}
