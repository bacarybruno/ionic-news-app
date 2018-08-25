import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events, Platform, ViewController } from 'ionic-angular';
import { Articles } from '../../providers/articles';
import { AppRate } from '@ionic-native/app-rate';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

// @IonicPage()
@Component({
  selector: 'page-details-page',
  templateUrl: 'details-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPage {
  news: any;
  hasSimilar: boolean = true;
  similar: any;
  @ViewChild(Slides) slides: Slides;

  constructor(private navCtrl: NavController, private navparams: NavParams, private articleService: Articles, private eventsService: Events, private appRate: AppRate, private ga: GoogleAnalytics, private platform: Platform, private viewCtrl: ViewController, private changeDetector: ChangeDetectorRef) {
      this.news = this.navparams.data.item;
      this.articleService.getRelatedPosts(this.news).then(data => {
        this.similar = data;
        this.hasSimilar = true;
        this.changeDetector.markForCheck();
      }).catch(() => {
        this.hasSimilar = false;
      });
      this.platform.ready().then(() => {
        this.initializeGa();
      });
  }

  initializeGa() {
      this.ga.trackView(this.news.link.split("https://sunubuzzsn.com")[1]);
  }


  ionViewWillLeave() {
    if(this.appRate && this.appRate.preferences) {
      this.appRate.preferences.storeAppURL = { 
        android: 'market://details?id=com.bacarybruno.sunubuzz'
      };
      this.appRate.promptForRating(false);
    }
  }

  ngAfterViewInit() {
    if(this.slides) this.slides.pager = false;
  }

  comments() {
  	this.navCtrl.push('Comments', { article: this.news });
  }

  share() {
    this.articleService.share(this.news);
  }

  nextSlide() {
    this.slides.slideNext();
  }

  previousSlide() {
    this.slides.slidePrev();
  }

  openArticle(e, item) {
    console.log("Publishing openArticle from details");
    this.eventsService.publish("openArticle", e, item);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
