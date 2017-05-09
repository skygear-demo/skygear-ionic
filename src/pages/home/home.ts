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

  addNewRecord() {
    this.skygearService.getSkygear()
    .then(()=> this.skygear.signupAnonymously())
    .then(()=> {
      var Note = this.skygear.Record.extend('Note');
      return this.skygear.publicDB.save(new Note({
        'content': 'Hello World'
      }));
    })
    .then((record)=> {
      this.skygearState = "Saved record: " + record.id;
    });
  }
}
