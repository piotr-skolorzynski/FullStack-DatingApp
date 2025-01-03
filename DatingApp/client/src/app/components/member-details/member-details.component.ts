import { Component, inject, input } from '@angular/core';
import { MembersService } from '../../services';
import { rxResource } from '@angular/core/rxjs-interop';
import { GallerizeDirective } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-member-details',
  imports: [GallerizeDirective],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
})
export class MemberDetailsComponent {
  public username = input<string>('');
  private readonly memberService = inject(MembersService);
  public member = rxResource({
    request: () => this.username(),
    loader: () => this.memberService.getMember(this.username()),
  });
}
