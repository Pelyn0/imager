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
  photos: Random[] = [];
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

  save(){

  }
}
