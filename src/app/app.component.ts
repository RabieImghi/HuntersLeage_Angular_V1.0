import { Component, HostListener, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './front-student/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);




  title = 'hunters_leage_v1.0'; 
  cursorX: number = 0;
  cursorY: number = 0;
  showHeader = true;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }
  constructor(private router: Router) {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(console.log);


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.startsWith('/admin') && event.url !== '/login' && event.url !== '/register' && event.url !== '/Unauthorized';
      }
    });
  }

}
