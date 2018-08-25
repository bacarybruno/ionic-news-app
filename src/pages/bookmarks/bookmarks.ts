import { Component } from '@angular/core';
import { IonicPage, NavController, Events, Platform } from 'ionic-angular';
import { Articles } from '../../providers/articles';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class Bookmarks {
  bookmarks: Array<any>;
  myIcon: any[] = [];
  has_bookmark: Boolean;

  constructor(private navCtrl: NavController, private articleService: Articles, private eventsService: Events, private ga: GoogleAnalytics, private platform: Platform) {
    this.bookmarks = new Array();
    this.platform.ready().then(() => {
      this.initializeGa();
    });
  }

  initializeGa() {
      this.ga.trackView("bookmarks");
  }

  ionViewDidEnter() {
    this.articleService.getBookmarks().then((articles: any) => {
      this.has_bookmark = articles.length > 0;
      this.bookmarks = articles;
    });
  }

  openArticle(e, item) {
    this.eventsService.publish("openArticle", e, item);
  }

  remove(item) {
    this.articleService.remove(item).then(() => {
      this.bookmarks = this.bookmarks.find(b => b.id !== item.id);
      if(this.myIcon[item.id] === "ios-bookmark-outline" ) {
        this.myIcon[item.id] = "ios-bookmark"
      }
      else if(this.myIcon[item.id] === "ios-bookmark"){
          this.myIcon[item.id] = "ios-bookmark-outline";
      }
    }).catch((e) => {});    
  }

  share(item) {
    this.articleService.share(item);
  }

}
