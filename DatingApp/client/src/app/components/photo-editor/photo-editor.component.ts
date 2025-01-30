import { Component, input } from '@angular/core';
import { IMember } from '../../interfaces';

@Component({
  selector: 'app-photo-editor',
  imports: [],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css',
})
export class PhotoEditorComponent {
  public member = input.required<IMember>();
}
