import { Component, inject, input, OnInit, output } from '@angular/core';
import { DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { IMember } from '../../interfaces';
import { AccountService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  imports: [DecimalPipe, NgClass, NgStyle, FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css',
})
export class PhotoEditorComponent implements OnInit {
  public member = input.required<IMember>();
  public memberChange = output<IMember>();

  private readonly accountService = inject(AccountService);
  private readonly baseUrl = environment;
  public uploader?: FileUploader;
  public hasBaseDropZoneOver = false;

  public ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  private initializeUploader(): void {
    this.uploader = new FileUploader({
      url: this.baseUrl.apiUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    //needed to add because authentication is in header not using cookie
    this.uploader.onAfterAddingFile = file => (file.withCredentials = false);

    this.uploader.onSuccessItem = (_1, response, _2, _3) => {
      const photo = JSON.parse(response);
      const updatedMember = { ...this.member() };
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    };
  }
}
