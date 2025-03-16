import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AccountService } from '../services';

@Directive({
  selector: '[appHasRole]', //*appHasRole
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];

  private readonly accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);
  private roles = this.accountService.roles;

  public ngOnInit(): void {
    if (this.roles()?.some((role: string) => this.appHasRole.includes(role))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainerRef.clear();
  }
}
