import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class Comments {
  article: any;
  comments: Array<Object> = [];
  has_comments;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ga: GoogleAnalytics, private platform: Platform) {
    this.article = this.navParams.get('article');
    this.article.comments = this.article.comments || [];
    this.comments = this.article.comments[0] || [];
    console.log(this.comments[0]);
    if (this.comments.length > 0) {
      this.has_comments = true;
    }
    this.platform.ready().then(() => {
      this.initializeGa();
    });
  }

  initializeGa() {
      this.ga.trackView("comments");
  }

  newComment() {
    this.navCtrl.push('NewComment', this.article);
  }

}
