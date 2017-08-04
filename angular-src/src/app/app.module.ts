import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PhotosService } from './photos.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
