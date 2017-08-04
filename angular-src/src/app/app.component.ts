import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotosService } from './photos.service';
import { Photo } from './photos/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  public uploader: FileUploader = new FileUploader({url:'http://localhost:3000/photo'});
  photos: Photo[];

  constructor(private photosService: PhotosService) {}

  getPhotos(): void {
  this.photosService.getPhotos().then(photos => {
      this.photos = photos;
      console.log(photos);
    }
  );
}

  ngOnInit(): void {
    this.getPhotos();
  }
}
