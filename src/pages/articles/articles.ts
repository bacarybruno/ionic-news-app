import { Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavParams, Events, Platform, ActionSheetController, Content } from 'ionic-angular';
import { Articles } from '../../providers/articles';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


/**
 * Generated class for the ArticlesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesPage {

  @ViewChild(Content) content: Content;
  news: any;
  myIcon: any[] = [];
  page: number = 1;
  defaultThumbPlaceholder: string = "assets/img/thumb-placeholder.png";
  errorThumbPlaceholder: string = "assets/img/thumb-placeholder-failed.png";

  constructor(private navParams: NavParams, private articleService: Articles, private eventsService: Events, private ga: GoogleAnalytics, private platform: Platform, private actionSheetCtrl: ActionSheetController, private changeDetector: ChangeDetectorRef) {
    this.doRefresh();
    this.platform.ready().then(() => {
      this.initializeGa();
    });
    this.platform.resume.subscribe(() => {
      this.doRefresh();
    });
  }

  initializeGa() {
    this.ga.trackView("articles");
  }

  loadCache() {
    this.articleService.getArticlesCache().then(data => {
      if(!this.news) this.news = data;
      this.changeDetector.markForCheck();
    });
  }
  
  // ionViewWillLoad() {
  //   this.loadCache();
  // }

  options(e, item) {
    this.actionSheetCtrl.create({
      title: "Options",
      buttons: [
        {
          text: "Lire plus tard",
          icon: "bookmarks",
          handler: () => {
            this.save(item);
          }
        },
        {
          text: "Partager",
          icon: "share",
          handler: () => {
            this.share(item);
          }
        },
        {
          text: "Fermer",
          role: "cancel"
        }
      ]
    }).present();
  }

  updateBookmarks() {
    this.articleService.getBookmarks().then((bookmarks: any) => {
        this.myIcon = [];
        bookmarks.forEach(bookmark => {
          this.myIcon[bookmark.id] = "ios-bookmark";
        });
    }).catch(() => { });
  }

  ionViewDidEnter() {
    this.updateBookmarks();
  }

  share(item) {
   this.articleService.share(item);
  }

  save(index) {
    console.log("Saving");
    console.log(this.myIcon[index.id]);
    if (this.myIcon[index.id] === "ios-bookmark" ) {
      this.myIcon[index.id] = "ios-bookmark-outline";
      this.articleService.remove(index);

    } else {
        this.myIcon[index.id] = "ios-bookmark";
        this.articleService.save(index);
    };   
  }

  openArticle(e, item) {
    this.eventsService.publish("openArticle", e, item);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.articleService.loadData(this.navParams.data.id, this.page).then(data => {
      this.news = this.news.concat(data);
      infiniteScroll.complete();
      console.log("infinite page " + this.page);
      this.changeDetector.markForCheck();
    });
  }

  doRefresh(refresher?) {
    this.page = 1;
    this.articleService.loadData(this.navParams.data.id, this.page)
    .then(data => {
      this.news = [];
      this.news = this.news.concat(data);
      if(refresher) refresher.complete();
      this.changeDetector.markForCheck();
    }).catch(e => {
      this.loadCache();
    });
    
  }


}
