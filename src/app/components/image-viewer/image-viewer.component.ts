import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment';
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
  result: string = '';
  unsplash = createApi({
    accessKey: environment.unsplashAccessKey,
  });
  isGrayed: boolean = false;
  isCompared: boolean = false;

  ngOnInit(): void {
  }

  getImages(){
    this.unsplash.photos.getRandom({query: this.searchText, count: 2}).then(response => {
      this.photos = response.response as Random[];

    });
  }

  swap(){
    console.log(this.isGrayed);
    this.photos.reverse();
  }

  compare() {
    const canvas = document.createElement('canvas');
    canvas.id = 'result-image';
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = this.photos[0].urls.small;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, 0, 0);
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      
      const canvas2 = document.createElement('canvas');
      const ctx2 = canvas2.getContext('2d');
      const img2 = new Image();
      img2.src = this.photos[1].urls.small;
      img2.crossOrigin = "Anonymous";
      img2.onload = () => {
        
        canvas2.width = img2.width;
        canvas2.height = img2.height;
        ctx2!.drawImage(img2, 0, 0);
        const imageData2 = ctx2!.getImageData(0, 0, canvas2.width, canvas2.height);

        let result = this.compareImages(imageData, imageData2);

        ctx!.putImageData(result, 0, 0);
        let resultElement = document.querySelector('#result');
        resultElement!.innerHTML = '';
        resultElement!.appendChild(canvas);
        this.isCompared = true;
      };
    };
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
    var link = document.createElement('a');
    link.download = 'Imager_ComparisonResult.png';
    link.href = (document.querySelector(`#result-image`) as HTMLCanvasElement).toDataURL();
    link.click();
  }

  private grayScale(imageData: ImageData) {
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      let avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
      pixels[i] = avg;
      pixels[i+1] = avg;
      pixels[i+2] = avg;
    }
  }

  private compareImages(image: ImageData, image2: ImageData): ImageData{
    if(this.isGrayed){
      this.grayScale(image);
      this.grayScale(image2);
    }

    const pixels = image.data;
    for(let i = 0; i < pixels.length; i+=4){
      let y = this.calculateRelativeLuminance(pixels, i) * 100;
      let y2 = this.calculateRelativeLuminance(image2.data, i) * 100;

      if(Math.abs(y - y2) > this.admission) {
        if (y - y2 >= 0){
          pixels[i] = 255;
          pixels[i+2] = 0;
        }
        else{
          pixels[i] = 0;
          pixels[i+2] = 255;
        }
        
        pixels[i+1] = 0;
        pixels[i+3] = 255;
      }
    }
    
    return image;
  }
  
  // https://en.wikipedia.org/wiki/Relative_luminance
  private calculateRelativeLuminance(pixels: Uint8ClampedArray, i: number): number {
    let y = 0.2126*this.sRGBtoLin(pixels[i]/255) +
      0.7152*this.sRGBtoLin(pixels[i+1]/255) + 
      0.0722*this.sRGBtoLin(pixels[i+2]/255); 
      
    return y;
  }

  // https://stackoverflow.com/a/56678483
  private sRGBtoLin(colorChannel: number): number {
    // Send this function a decimal sRGB gamma encoded color value
    // between 0.0 and 1.0, and it returns a linearized value.

    if ( colorChannel <= 0.04045 ) {
        return colorChannel / 12.92;
    } else {
        return Math.pow(((colorChannel + 0.055) / 1.055), 2.4);
    }
}
}
