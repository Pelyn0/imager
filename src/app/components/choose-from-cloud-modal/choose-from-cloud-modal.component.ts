import { Component, Inject, OnInit} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {  BlobServiceClient } from "@azure/storage-blob";
import { environment } from "src/environment";

@Component({
    selector: 'choose-from-cloud-modal',
    templateUrl: 'choose-from-cloud-modal.component.html',
    styleUrls: ['choose-from-cloud-modal.component.css']
  })
  export class ChooseFromCloudModalComponent implements OnInit {
    blobServiceClient = new BlobServiceClient(environment.blobSasUrl);
    blobPhotos: string[] = [];

    constructor(public dialogRef: MatDialogRef<ChooseFromCloudModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) {
    }

    async ngOnInit(){
        this.data = ['', ''];
        await this.getList();
    }

    async getList(){
        this.blobPhotos = [];
        const containerClient = this.blobServiceClient.getContainerClient('imager');
        let blobs = containerClient.listBlobsFlat();

        for await(const blob of blobs) {
            if (blob.name.startsWith('imager')){
                const blobClient = containerClient.getBlobClient(blob.name);
                const downloadBlockBlobResponse = await blobClient.download();
                if(downloadBlockBlobResponse.blobBody){
                    let content = await (await downloadBlockBlobResponse.blobBody).text()
                    this.blobPhotos.push(content);
                }
            }
        } 
    }

    choose(asNumber: number, image: string) {
        this.data[asNumber-1] = image;
    }

    
  onNoClick(): void {
    this.dialogRef.close();
  }
  }