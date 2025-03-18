import { Component, inject, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AdminService } from '../../../services/admin.service';
import { IUser } from '../../../interfaces';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly modalService = inject(BsModalService);
  private bsModalRef = new BsModalRef<RolesModalComponent>();
  public users: IUser[] = [];

  public ngOnInit(): void {
    this.getUsersWithRoles();
  }

  public openRolesModal(user: IUser): void {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin', 'Moderator', 'Member'],
        users: this.users,
        rolesUpdated: false,
      },
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService
            .updateUserRoles(user.username, selectedRoles)
            .subscribe({
              next: roles => (user.roles = roles),
            });
        }
      },
    });
  }

  private getUsersWithRoles(): void {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => (this.users = users),
    });
  }
}
