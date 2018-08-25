import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Articles } from '../providers/articles';
import { OneSignal } from "@ionic-native/onesignal";
import { AdsServiceProvider } from "../providers/ads-service/ads-service";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Device } from '@ionic-native/device';

import { DetailsPage } from '../pages/details-page/details-page';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{name?: string, component?: string, index: number, icon?: string}>;

  constructor(private app: App, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private articleService: Articles, private oneSignal: OneSignal, private adsService: AdsServiceProvider, private eventsService: Events, private ga: GoogleAnalytics, private device: Device, private modalCtrl: ModalController) {

    this.initializeApp();

    this.eventsService.subscribe("openArticle", (event, item) => {
      let views = parseInt(localStorage.getItem("views") || "0");
      views += 1;
      views %= 3;
      if(views === 0) {
        setTimeout(() => {
          this.adsService.showInterstitial();
        }, 3000);
      }
      localStorage.setItem("views", String(views));
      this.openArticle(event, item);
    });

    this.pages = [
      // { title: 'Top Stories', component: 'TopStories', index: 0, icon: 'md-trending-up'},
      // { title: 'Most Popular', component: 'MostPopular', index: 1, icon: 'ios-podium'},
      // { title: 'Opinion', component: 'Opinion', index: 2, icon: 'ios-megaphone'},
      // { title: 'World', component: 'World', index: 3, icon: 'md-map' },
      // { title: 'Africa', component: 'Africa', index: 4, icon: 'md-globe' },
      // { title: 'Tech', component: 'Tech', index: 5, icon: 'ios-laptop' },
      // { title: 'Sports', component: 'Sport', index: 6, icon: 'ios-football' },
      // { title: 'Fashion', component: 'Fashion', index: 7, icon: 'ios-shirt' }
    ];
    this.pages = articleService.loadCategories();

  }

  initializeApp() { 

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeOneSignal();
      this.initializeGa();
      this.adsService.showArticlesAds();
    });
  }

  initializeGa() {
    this.ga.debugMode();
    // this.ga.startTrackerWithId("UA-109320580-1")
    this.ga.startTrackerWithId("UA-92970812-1")
    .then(() => {
      this.ga.setUserId(this.device.uuid);
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  initializeOneSignal() {
      // this.oneSignal.startInit("7721ae6c-18d9-428f-885a-77d7f0129c34", "299045477623");
      // this.oneSignal.startInit("682ca972-be0b-4e98-aa54-9de23216dc8b", "299045477623");
      this.oneSignal.startInit("a54eca4b-1a48-45a8-a6f0-aca83f771c7c", "299045477623");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.enableVibrate(true);
      this.oneSignal.enableSound(true);
      this.oneSignal.setSubscription(true);
      this.oneSignal.handleNotificationReceived().subscribe(() => {});
      this.oneSignal.handleNotificationOpened().subscribe((notification) => {
        let additionalData = notification.notification.payload.additionalData;
        let postId = additionalData["postId"] || additionalData["PostId"] || additionalData["postid"];
        console.log(postId);
        this.articleService.getPost(postId).then(res => {
          this.openArticle(null, res, true);
        }).catch(err => console.log(JSON.stringify(err, Object.getOwnPropertyNames(err))));
      });
      this.oneSignal.endInit();
  }

  openArticle(e, item, directAccess?) {
    if((item && e && e.target.nodeName.toLowerCase() !== "ion-icon") || directAccess) {
      // this.app.getRootNav().push('DetailsPage', {item: item});
      this.modalCtrl.create(DetailsPage, {item}).present();
    }
  }

  search() {
    this.nav.push('Search');
  }

  settings() {
    this.app.getRootNav().push('Settings').then(() => {
    });
  }

  feedback() {
    this.nav.push("ContactPage");
  }

}
