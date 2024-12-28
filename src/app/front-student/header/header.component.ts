import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TokenStorageServiceService } from '../../service/token-storage-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isMenuOpen = false;
  activeLink = '';
  isScrolled = false;

  constructor(private router: Router,private tokenService: TokenStorageServiceService) {}
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }
  
  getToken(){
    return this.tokenService.getToken();
  }
  getRole(){
    return this.tokenService.getRole();
  }
}
