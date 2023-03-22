import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ImageViewerComponent } from "./image-viewer/image-viewer.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from "@angular/forms";

@NgModule({
    exports:[ImageViewerComponent],
    declarations: [
        ImageViewerComponent
    ],
    imports: [
      BrowserModule,
      MatButtonModule,
      MatDividerModule,
      MatInputModule,
      MatIconModule,
      FormsModule
    ],
  })
  export class AllModule { }