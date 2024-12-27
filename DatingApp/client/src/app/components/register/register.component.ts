import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterFormGroup } from '../../models';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public registerForm: FormGroup<RegisterFormGroup>;

  public ngOnInit(): void {
    this.initializeRegisterForm();
  }

  public register(): void {
    console.log(this.registerForm);
  }

  public cancel(): void {
    console.log();
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.fb.group<RegisterFormGroup>({
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      password: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
}
