import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFormGroup } from '../../models';
import { AccountService } from '../../services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);

  public loginForm: FormGroup<LoginFormGroup>;
  public isLoggedIn = false;

  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  public onLogin(): void {
    const credentials = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    console.log(credentials);
    this.accountService
      .login(credentials)
      .pipe(
        tap(response => {
          console.log(response);
          this.isLoggedIn = true;
          this.loginForm.reset(); //check why is not clearing data
        })
      )
      .subscribe({
        error: (error: any) => console.log(error),
      });
  }

  public logout(): void {
    //temp sol
    this.isLoggedIn = false;
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
