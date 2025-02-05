import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterFormGroup } from '../../models';
import { AccountService } from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public cancelled = output<void>();

  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);

  public registerForm: FormGroup<RegisterFormGroup>;

  public ngOnInit(): void {
    this.initializeRegisterForm();
  }

  public register(): void {
    console.log(this.registerForm.value);

    //refactor
    // const newUser = {
    //   username: this.registerForm.controls.username.value,
    //   password: this.registerForm.controls.password.value,
    // };
    // this.accountService.register(newUser).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error.error),
    // });
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
      confirmPassword: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
}
