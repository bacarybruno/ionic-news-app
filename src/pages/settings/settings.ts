import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { OneSignal } from "@ionic-native/onesignal";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  notification: boolean = true;
  update: boolean = true;

  constructor(private oneSignal: OneSignal, private storageService: Storage) {
    this.storageService.get("notification").then(data => {
      this.notification = data || true;
    });
    this.storageService.get("update").then(data => {
      this.update = data || true;
    });
  }

  updateItem() {
    this.oneSignal.setSubscription(this.notification);
    this.storageService.set("notification", this.notification);
    this.storageService.set("update", this.update);
  }

}
