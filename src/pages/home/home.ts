import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SkygearService } from '../../app/skygear.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skygear = null;
  skygearState = "Not ready";

  constructor(public navCtrl: NavController, private skygearService: SkygearService) {

  }

  ngOnInit(): void {
    this.skygearService.getSkygear()
    .then(skygear=> {
      this.skygear = skygear;
      this.skygearState = "Configurated";
    })
    .catch(error=> {
      this.skygearState = "Errored";
    });
  }
}
