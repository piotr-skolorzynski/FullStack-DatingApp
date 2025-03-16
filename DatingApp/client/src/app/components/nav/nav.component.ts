import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginFormGroup } from '../../models';
import { AccountService } from '../../services';
import { HasRoleDirective } from '../../directives';

@Component({
  selector: 'app-nav',
  imports: [
    HasRoleDirective,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  public readonly accountService = inject(AccountService);
  public loginForm: FormGroup<LoginFormGroup>;

  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  public onLogin(): void {
    const credentials = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };

    this.accountService
      .login(credentials)
      .pipe(
        tap(_ => {
          this.loginForm.reset();
          this.router.navigateByUrl('/members');
        })
      )
      .subscribe({
        error: (error: any) => this.toastr.error(error.error),
      });
  }

  public onLogout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group<LoginFormGroup>({
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      password: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
}
