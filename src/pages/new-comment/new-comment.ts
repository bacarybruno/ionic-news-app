import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Articles } from '../../providers/articles';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@IonicPage()
@Component({
  selector: 'page-new-comment',
  templateUrl: 'new-comment.html',
})
export class NewComment {
  name: String = "";
  email: String = "";
  comment: String = "";

  constructor(private navCtrl: NavController, private navParams: NavParams, private articleService: Articles, private toastCtrl: ToastController, private ga: GoogleAnalytics, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeGa();
    });
  }

  initializeGa() {
      this.ga.trackView("new-comment");
  }

  isValid() {
    return (this.name !== "") && (this.email !== "") && (this.comment !== "");
  }

  send() {
    this.articleService.comment(this.navParams.data.id, this.name, this.email, this.comment)
    .then(data => {
      let toast = this.toastCtrl.create({
        message: "Merci d'avoir commenté cet article",
        duration: 3000
      });
      toast.present();
      toast.onDidDismiss(() => {
        this.navCtrl.pop();
      });
    }).catch((error) => {
      let toast = this.toastCtrl.create({
        message: error,
        showCloseButton: true,
        closeButtonText: "Fermer"
      });
      toast.present();
    });
  }

}
