import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from '../../../service/token-storage-service.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  constructor(private route: Router, private token: TokenStorageServiceService){}


  ngOnInit(){
    this.token.clear();
    this.route.navigateByUrl('');
  }
  
}
