import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFormGroup } from '../../models';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public loginForm: FormGroup<LoginFormGroup>;

  public ngOnInit(): void {
    this.initializeLoginForm();
  }

  public onLogin(): void {
    console.log(this.loginForm);
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
