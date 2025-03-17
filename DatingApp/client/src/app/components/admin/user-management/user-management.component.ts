import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IUser } from '../../../interfaces';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  public users: IUser[] = [];

  public ngOnInit(): void {
    this.getUsersWithRoles();
  }

  private getUsersWithRoles(): void {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => (this.users = users),
    });
  }
}
