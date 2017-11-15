import skygear from 'skygear';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import {
  SkygearService,
} from '../../app/skygear.service';


@Component({
  selector: 'page-push',
  templateUrl: 'push.html',
})
export class PushPage {
  deviceID = null;
  deviceToken = null;
  message = "default";
  targetDevice = null;
  targetMessage = "default";
  notificationPayload = null;

  constructor(
    public navCtrl: NavController,
    private push: Push,
    private skygearService: SkygearService,
  ) {
    // to check if we have permission
    push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });
    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      this.notificationPayload = notification.message;
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration)
      this.deviceID = skygear.push.deviceID;
      this.deviceToken = registration.registrationId;
      return this.skygearService.getSkygear().then((skygear) => {
        skygear.push.registerDevice(this.deviceToken, 'android');
      });
    });

    pushObject.on('error').subscribe((error) => {
      console.error('Error with Push plugin', error);
    });
  }

  sendToThis() {
    console.log('Trying to this device');
    const title = 'Title';
    const message = this.message;
    this.skygearService.getSkygear().then((skygear) => {
      skygear.push.sendToDevice([skygear.push.deviceID],
        {
          'apns': {
            'aps': {
              'alert': {
                'title': title,
                'body': message,
              }
            },
            'from': 'skygear',
            'operation': 'notification',
          },
          'gcm': {
            'notification': {
              'title': title,
              'body': message,
            }
          },
        }
       );
    });
  }

  sendToOther() {
    console.log('Trying to device', this.targetDevice);
    const title = 'Title';
    const message = this.targetMessage;
    this.skygearService.getSkygear().then((skygear) => {
      skygear.push.sendToDevice([this.targetDevice],
        {
          'apns': {
            'aps': {
              'alert': {
                'title': title,
                'body': message,
              }
            },
            'from': 'skygear',
            'operation': 'notification',
          },
          'gcm': {
            'notification': {
              'title': title,
              'body': message,
            }
          },
        }
       );
    });
  }

}
