import { Component, input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent implements ControlValueAccessor {
  public id = input.required<string>();
  public label = input<string>('');
  public type = input<string>('text');
  public placeholder = input<string>('');

  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  public writeValue(obj: any): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}
}
