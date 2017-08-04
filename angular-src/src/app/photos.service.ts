import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Photo } from './photos/photo';

@Injectable()
export class PhotosService {
  private photosUrl = 'http://localhost:3000/api/photos';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}

  getPhotos(): Promise<Photo[]> {
    return this.http.get(this.photosUrl)
      .toPromise()
      .then(response => response.json().data as Photo[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
