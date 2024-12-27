import { Component, inject, OnInit, output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public cancelled = output<void>();

  // private readonly http = inject(HttpClient);
  // private readonly url = 'https://localhost:5001/api/users';
  private readonly fb = inject(FormBuilder);

  public registerForm: FormGroup<RegisterFormGroup>;
  // public users = rxResource({
  //   loader: () => this.http.get<any[]>(this.url),
  // });

  public ngOnInit(): void {
    this.initializeRegisterForm();
  }

  public register(): void {
    console.log(this.registerForm);
  }

  public cancel(): void {
    this.cancelled.emit();
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
