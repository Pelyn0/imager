import { Component, OnInit } from '@angular/core';
import { createApi } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements  OnInit {
  searchText: string = "";
  admission: number = 50;
  photos: Random[] = [{urls:{small:""}} as Random, {urls:{small:""}} as Random];
  unsplash = createApi({
    accessKey: 'tgikrpUprzc79ynmrCWe38qzTblYH63k2JPhqENuJUg',
  });

  ngOnInit(): void {
  
  }

  getImages(){
    this.unsplash.photos.getRandom({query: this.searchText, count: 2}).then(response => {
      this.photos = response.response as Random[];

    });
  }

  swap(){
    this.photos.reverse();
  }

  compare() {
    const resultImage = document.querySelector("#result") as HTMLImageElement;
    const file = (document.querySelector("input[type=file]") as HTMLInputElement)!.files![0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        resultImage!.src = reader.result as string;
      },
      false
    );
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  uploadImage(number: number) {
    (document.querySelector(`#uploadImage${number}`) as HTMLInputElement)!.click();
  }

  onUploadImageChange($event: any, number: number) {
    const file = $event.target!.files![0];
    
    const reader = new FileReader();
    reader.onload = () => this.photos[number-1]!.urls.small = reader.result as string;
    
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  save(){
  }
}
