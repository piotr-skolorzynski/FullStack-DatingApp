import { Component } from '@angular/core';
import { HasRoleDirective } from '../../../directives';
import { UserManagementComponent } from '../user-management/user-management.component';
import { PhotoManagementComponent } from '../photo-management/photo-management.component';

@Component({
  selector: 'app-admin-panel',
  imports: [
    HasRoleDirective,
    PhotoManagementComponent,
    UserManagementComponent,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {}
