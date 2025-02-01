import { Component, effect, HostListener, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MembersService, AccountService } from '../../services';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { IMember } from '../../interfaces';

@Component({
  selector: 'app-member-edit',
  imports: [NgClass, PhotoEditorComponent, ReactiveFormsModule],
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
    this.memberService.updateMember(this.memberForm.value).subscribe({
      next: _ => {
        this.tostr.success('Profile updated successfully');
        this.memberForm.markAsPristine();
      },
    });
  }

  // TODO - teraz okazuje się że mam problem bo korzystam z rxResource a dla file uploader otrzymuję file i updatuje
  //jego tabele ze zdjęciami i przesyłam tutaj żeby inputa w photo editor zuupdatować, może użycie rxResource.reoload
  public onMemberChange(updatedUser: IMember) {
    // this.member.reload()
  }

  @HostListener('window:beforeunload', ['$event'])
  public notify($event: any): void {
    if (this.memberForm.dirty) {
      $event.returnValue = true;
    }
  }
}
