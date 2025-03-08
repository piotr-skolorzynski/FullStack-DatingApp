import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IMember } from '../../interfaces';
import { LikesService } from '../../services/likes.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private readonly likeService = inject(LikesService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private usernameForThread = this.messageService.usernameForThread;
  public hasLiked = computed(() =>
    this.likeService.likesIds().includes(this.member().id)
  );
  public member = input.required<IMember>();

  public toggleLike(): void {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likesIds.update(ids =>
            ids.filter(x => x !== this.member().id)
          );
        } else {
          this.likeService.likesIds.update(ids => [...ids, this.member().id]);
        }
      },
    });
  }

  public redirectToUserDetail(name: string) {
    this.usernameForThread.set(name);
    this.router.navigateByUrl(`/members/${this.member().username}`);
  }
}
