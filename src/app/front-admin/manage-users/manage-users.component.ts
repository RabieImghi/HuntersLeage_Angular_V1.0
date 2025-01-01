import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from '../CRUD/user/detail-user/detail-user.component';
import { UpdateUserComponent } from '../CRUD/user/update-user/update-user.component';
import { DeleteUserComponent } from '../CRUD/user/delete-user/delete-user.component';
import { CreateUserComponent } from '../CRUD/user/create-user/create-user.component';
import { UserResponse } from '../interface/user-response';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComputationService } from '../../service/shared/computation.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, DetailUserComponent, UpdateUserComponent, DeleteUserComponent,CreateUserComponent],
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent {

  page: number = 0;
  size: number = 12;
  totalElements: number = 0;
  users: UserResponse[] =[];
  searchUserForm = this.fb.group({
    id: [''],
    username: [''],
    email: [''],
    cin: [''],
  });

  
  
  constructor(private userService: UserService, private fb: FormBuilder, private com: ComputationService) {}


  ngOnInit(): void {
    this.getUsers();
    this.com.refreshComput$.subscribe(()=>{
      this.getUsers()
    })
  }

  getUsers(): void {
    this.userService.getUsers(this.searchUserForm.value, this.page, this.size).subscribe(
      response => {
        this.users = response.content;
        this.totalElements = response.totalElements;

      },
      error => {
        console.log(error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getUsers();
  }
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
}
