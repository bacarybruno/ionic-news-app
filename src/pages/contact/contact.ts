import { Articles } from '../../providers/articles';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  name: String = "";
  email: String = "";
  message: String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private articleService: Articles, private alertCtrl: AlertController, private ga: GoogleAnalytics, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeGa();
    });
  }

  initializeGa() {
      this.ga.trackView("contacts");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }


  isValid() {
    return (this.name !== "") && (this.email !== "") && (this.message !== "");
  }

  send() {
    this.articleService.sendMail(this.name, this.email, this.message)
    .then(() => {
      let alert = this.alertCtrl.create({ 
        title: 'Message',
        message: 'Message envoyé.',
        buttons: ["Ok"]
      });
      alert.present();
      alert.onDidDismiss(() => {
        this.navCtrl.pop();
      });
    });
  }
}
