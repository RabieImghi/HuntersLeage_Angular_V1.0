import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from '../CRUD/user/detail-user/detail-user.component';
import { UpdateUserComponent } from '../CRUD/user/update-user/update-user.component';
import { DeleteUserComponent } from '../CRUD/user/delete-user/delete-user.component';
import { CreateUserComponent } from '../CRUD/user/create-user/create-user.component';


interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  cin: string;
  nationality: string;
  licenseExpirationDate: string;
  joinDate: string;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, DetailUserComponent, UpdateUserComponent, DeleteUserComponent,CreateUserComponent],
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent {
  users: UserResponse[] = [
    {
      id: '1',
      username: 'george.johnson',
      email: 'george.johnson@example.com',
      role: 'ADMIN',
      firstName: 'George',
      lastName: 'Johnson',
      cin: '123456789',
      nationality: 'American',
      licenseExpirationDate: '2025-06-30',
      joinDate: '2020-01-15',
    },
    {
      id: '2',
      username: 'jane.doe',
      email: 'jane.doe@example.com',
      role: 'JURY',
      firstName: 'Jane',
      lastName: 'Doe',
      cin: '987654321',
      nationality: 'British',
      licenseExpirationDate: '2024-11-20',
      joinDate: '2019-04-01',
    },
    {
      id: '3',
      username: 'john.smith',
      email: 'john.smith@example.com',
      role: 'MEMBER',
      firstName: 'John',
      lastName: 'Smith',
      cin: '456123789',
      nationality: 'Canadian',
      licenseExpirationDate: '2023-09-15',
      joinDate: '2018-07-10',
    },
    {
      id: '4',
      username: 'emily.white',
      email: 'emily.white@example.com',
      role: 'MEMBER',
      firstName: 'Emily',
      lastName: 'White',
      cin: '789321654',
      nationality: 'Australian',
      licenseExpirationDate: '2026-03-05',
      joinDate: '2021-10-22',
    },
  ];
}
