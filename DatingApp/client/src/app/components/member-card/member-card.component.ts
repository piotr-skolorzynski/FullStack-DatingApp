import { Component, computed, effect, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IMember } from '../../interfaces';
import { LikesService } from '../../services/likes.service';
import { PresenceService } from '../../services';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  imports: [NgClass, RouterLink],
})
export class MemberCardComponent {
  public member = input.required<IMember>();

  private readonly likeService = inject(LikesService);
  private readonly router = inject(Router);
  private readonly presenceService = inject(PresenceService);
  public hasLiked = computed(() =>
    this.likeService.likesIds().includes(this.member().id)
  );
  public isOnline = computed(() =>
    this.presenceService.onlineUsers().includes(this.member().username)
  );

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

  public redirectToUserDetail() {
    this.router.navigateByUrl(`/members/${this.member().username}`);
  }
}
