import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormGroup } from '../../models';
import { AccountService } from '../../services';
import { matchValues } from '../../validators';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { Gender } from '../../enums';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public cancelled = output<void>();
  public validationErrors: string[] | undefined;

  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private matchValues = matchValues;
  private gender = Gender;

  public registerForm: FormGroup<RegisterFormGroup>;

  public ngOnInit(): void {
    this.initializeRegisterForm();
  }

  public register(): void {
    const newUser = {
      gender: this.registerForm.controls.gender.value,
      username: this.registerForm.controls.username.value,
      knownAs: this.registerForm.controls.knownAs.value,
      dateOfBirth: this.getDateOnly(
        this.registerForm.controls.dateOfBirth.value
      ),
      city: this.registerForm.controls.city.value,
      country: this.registerForm.controls.country.value,
      password: this.registerForm.controls.password.value,
    };

    this.accountService.register(newUser).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => (this.validationErrors = error),
    });
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.fb.group<RegisterFormGroup>({
      gender: this.fb.nonNullable.control(this.gender.Male),
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      knownAs: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      dateOfBirth: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      city: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      country: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      password: this.fb.nonNullable.control('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ],
      }),
      confirmPassword: this.fb.nonNullable.control('', {
        validators: [Validators.required, this.matchValues('password')],
      }),
    });

    //subscribe to password input field to update confirmPasword input value an trigger validation again
    this.registerForm.controls.password.valueChanges.subscribe({
      next: () =>
        this.registerForm.controls.confirmPassword.updateValueAndValidity(),
    });
  }

  private getDateOnly(dob: string | undefined): string | undefined {
    if (!dob) {
      return;
    }

    return new Date(dob).toISOString().slice(0, 10);
  }
}
