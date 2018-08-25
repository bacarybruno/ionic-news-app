import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class Popover {

  constructor(public app: App, public navCtrl: NavController, public viewCtrl: ViewController, private socialSharing: SocialSharing, public alertCtrl: AlertController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  login() {
    this.app.getRootNav().push('Login').then(() => {
      this.viewCtrl.dismiss();
    });
  }

  settings() {
    this.app.getRootNav().push('Settings').then(() => {
      this.viewCtrl.dismiss();
    })
  }

  bookmark() {
    this.app.getRootNav().push('Bookmarks').then(() => {
      this.viewCtrl.dismiss();
    });
  }

  feedback() {
    this.socialSharing.shareViaEmail('Message', 'Sujet', ['bacarybruno@gmail.com']).then(data => {
      // Success!
      this.alertCtrl.create({ 
        title: 'Message',
        message: 'Message envoyé.',
        buttons: ["Ok"]
      }).present();
      this.viewCtrl.dismiss();
    }).catch(() => {
      // Error!
      this.alertCtrl.create({
        title: 'Erreur',
        message: 'Erreur. Veuillez réessayer.',
        buttons: ["Ok"]
      }).present();
    });
  }

}
