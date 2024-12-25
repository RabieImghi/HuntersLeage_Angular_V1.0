import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hunters_leage_v1.0';
  cursorX: number = 0;
  cursorY: number = 0;

   @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
    }
}
