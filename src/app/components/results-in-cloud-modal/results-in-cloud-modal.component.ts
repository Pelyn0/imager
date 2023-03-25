import { Component, OnInit} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BlobServiceClient } from "@azure/storage-blob";
import { environment } from "src/environment";

@Component({
    selector: 'results-in-cloud-modal',
    templateUrl: 'results-in-cloud-modal.component.html',
    styleUrls: ['results-in-cloud-modal.component.css']
  })
  export class ResultsInCloudModalComponent implements OnInit {
    blobServiceClient = new BlobServiceClient(environment.blobSasUrl);
    blobPhotos: string[] = [];

    constructor(public dialogRef: MatDialogRef<ResultsInCloudModalComponent>) {
    }

    async ngOnInit(){
        await this.getList();
    }

    async getList(){
        this.blobPhotos = [];
        const containerClient = this.blobServiceClient.getContainerClient('imager');
        let blobs = containerClient.listBlobsFlat();

        for await(const blob of blobs) {
            if (blob.name.startsWith('results')){
                const blobClient = containerClient.getBlobClient(blob.name);
                const downloadBlockBlobResponse = await blobClient.download();
                if(downloadBlockBlobResponse.blobBody){
                    let content = await (await downloadBlockBlobResponse.blobBody).text()
                    this.blobPhotos.push(content);
                }
            }
        } 
    }

    
  onNoClick(): void {
    this.dialogRef.close();
  }
  }