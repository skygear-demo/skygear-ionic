import { Component } from '@angular/core';
import {
  Platform,
  NavController
} from 'ionic-angular';

import {
  SkygearService,
  Note,
} from '../../app/skygear.service';
import {
  CamPage
} from '../cam/cam';
import {
  PushPage
} from '../push/push';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skygear = null;
  skygearState = "Not ready";

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private skygearService: SkygearService
  ) {
    // No op
    console.log(this.platform);
  }

  ngOnInit(): void {
    this.skygearService.getSkygear()
      .then((skygear) => {
        this.skygear = skygear;
        this.skygearState = "Configurated";
      })
      .catch((error) => {
        this.skygearState = "Errored";
      });
  }

  addNewRecord() {
    this.skygearService.getSkygear()
      .then(()=> {
        return this.skygear.publicDB.save(new Note({
          'content': 'Hello World'
        }));
      })
      .then((record)=> {
        this.skygearState = "Saved record: " + record.id;
      }, (error) => {
        console.log(error);
        this.skygearState = "Saved Error: " + error;
      });
  }

  gotoCam() {
    this.navCtrl.push(CamPage);
  }

  gotoPush() {
    this.navCtrl.push(PushPage);
  }
}
