import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { RegisterFormGroup } from '../../models';
import { AccountService } from '../../services';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public readonly accountService = inject(AccountService);
  public loginForm: FormGroup<RegisterFormGroup>;

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
        tap(response => {
          console.log(response);
          this.loginForm.reset();
        })
      )
      .subscribe({
        error: (error: any) => console.log(error),
      });
  }

  public logout(): void {
    this.accountService.logout();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group<RegisterFormGroup>({
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      password: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
}
