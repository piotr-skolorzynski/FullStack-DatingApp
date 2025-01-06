import { Component, computed, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MembersService, AccountService } from '../../services';

@Component({
  selector: 'app-member-edit',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent {
  private readonly memberService = inject(MembersService);
  private readonly username = inject(AccountService).currentUser;
  private readonly fb = inject(FormBuilder);
  private readonly tostr = inject(ToastrService);

  public memberForm: FormGroup;
  public member = rxResource({
    request: () => this.username,
    loader: () => this.memberService.getMember(this.username()?.username ?? ''),
  });
  public fillForm = effect(() => {
    const member = this.member.value();

    this.memberForm = this.fb.group({
      introduction: this.fb.control(member?.introduction ?? '', {
        validators: [],
      }),
      lookingFor: this.fb.control(member?.lookingFor ?? '', {
        validators: [],
      }),
      interests: this.fb.control(member?.interests ?? '', {
        validators: [],
      }),
      city: this.fb.control(member?.city ?? '', {
        validators: [],
      }),
      country: this.fb.control(member?.country ?? '', {
        validators: [],
      }),
    });
  });

  public updateMember(): void {
    this.tostr.success('Profile updated successfully');
    this.memberForm.markAsPristine();
  }
}
