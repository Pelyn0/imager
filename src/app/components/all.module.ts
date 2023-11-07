import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ChooseFromCloudModalComponent } from './choose-from-cloud-modal/choose-from-cloud-modal.component';
import { ResultsInCloudModalComponent } from './results-in-cloud-modal/results-in-cloud-modal.component';

@NgModule({
  exports: [
    ImageViewerComponent,
    ChooseFromCloudModalComponent,
    ResultsInCloudModalComponent,
  ],
  declarations: [
    ImageViewerComponent,
    ChooseFromCloudModalComponent,
    ResultsInCloudModalComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
})
export class AllModule {}
