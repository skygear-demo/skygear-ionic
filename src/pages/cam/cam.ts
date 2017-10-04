import skygear from 'skygear';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {
  SkygearService,
  Note,
} from '../../app/skygear.service';


@Component({
  selector: 'page-cam',
  templateUrl: 'cam.html'
})
export class CamPage {
  base64Image = null;
  record = null;
  photoURL = null;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private skygearService: SkygearService,
  ) {

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.skygearService.getSkygear()
          .then(() => {
            const picture = new skygear.Asset({
              name: "photo.jpeg",
              base64: imageData,
              contentType: 'image/jpeg',
            });
            return skygear.publicDB.save(new Note({
              picture: picture
            }));
          }).then((result) => {
            this.record = result;
            this.photoURL = result.picture.url;
            console.log(result);
          });
    }, (err) => {
        console.log(err);
    });
  }

}
