import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform } from 'ionic-angular';
import { Articles } from '../../providers/articles';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {

  query: string;
  news: any;
  myIcon: any[] = [];
  page: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public articleService: Articles, public popoverCtrl: PopoverController, private ga: GoogleAnalytics, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeGa();
    });
  }

  initializeGa() {
      this.ga.trackView("search");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search');
  }

  search() {
    this.articleService.searchArticles(this.query, 1).then(res => {
      this.news = res;
      this.articleService.getBookmarks().then((bookmarks: any) => {
          bookmarks.forEach(bookmark => {
            this.myIcon[bookmark.id] = "ios-bookmark";
          });
      });
    });
  }

  share(item) {
   this.articleService.share(item);
  }

  save(index) {
    if (this.myIcon[index.id] === "ios-bookmark" ) {
      this.myIcon[index.id] = "ios-bookmark-outline"
      this.articleService.remove(index);

    } else if(this.myIcon[index.id] === "ios-bookmark-outline"){
        this.myIcon[index.id] = "ios-bookmark";
        this.articleService.save(index);
    };   
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('Popover');
    popover.present({
      ev: myEvent
    });
  }

  openArticle(e, item) {
    console.log(e);
    if(item && e.target.nodeName.toLowerCase() !== "ion-icon") {
      this.navCtrl.push('DetailsPage', {item: item});
    }
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.articleService.searchArticles(this.query, this.page).then(data => {
      this.news = this.news.concat(data);
      infiniteScroll.complete();
      console.log("infinite page " + this.page);
    });
  }

}
