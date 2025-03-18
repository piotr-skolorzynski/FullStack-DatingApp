import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  imports: [],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css',
})
export class RolesModalComponent {
  public bsModalRef = inject(BsModalRef);
  public username = '';
  public title = '';
  public availableRoles: string[] = [];
  public selectedRoles: string[] = [];
  public rolesUpdated = false;

  public updateChecked(checkedValue: string): void {
    if (this.selectedRoles.includes(checkedValue)) {
      this.selectedRoles = this.selectedRoles.filter(r => r !== checkedValue);
    } else {
      this.selectedRoles.push(checkedValue);
    }
  }

  public onSelectRoles(): void {
    this.rolesUpdated = true;
    this.bsModalRef.hide();
  }
}
