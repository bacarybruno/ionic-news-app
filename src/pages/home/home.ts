import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Articles } from "../../providers/articles";
import { AdsServiceProvider } from "../../providers/ads-service/ads-service";


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  categories: Array<any>;
  tabToShow: Array<boolean> = [];
  tabRoot: string = 'ArticlesPage';

  constructor(private navCtrl: NavController, private articleService: Articles, private adsService: AdsServiceProvider) {
    this.categories = this.articleService.loadCategories();
    for (var _ = 0; _ < this.categories.length; _++) this.tabToShow.push(true);
    // this.platform.ready().then(() => {
    //   this.initializeGa();
    // });
  }

  // initializeGa() {
  //   this.ga.debugMode();
  //   this.ga.startTrackerWithId("UA-109320580-1", 10)
  //   .then(() => {
  //     this.ga.setUserId(this.device.uuid);
  //   })
  //   .catch(e => console.log('Error starting GoogleAnalytics', e));
  // }

  // checkForUpdate() {
  //     const checking = this.loadingCtrl.create({
  //       content: 'Recherche de mise à jour...',
  //       duration: 3000
  //     });
      
  //     checking.present();

  //     this.deploy.check().then((snapshotAvailable: boolean) => {
  //       if (snapshotAvailable) {
  //         this.downloadAndInstall();
  //       }
  //       else {
  //         const toast = this.toastCtrl.create({
  //           message: 'Aucune mise à jour trouvée.',
  //           duration: 3000
  //         });
  //         toast.present();
  //       }
  //     });
  // }

  // private downloadAndInstall() {
  //   const updating = this.loadingCtrl.create({
  //     content: 'Mise à jour en cours...'
  //   });
  //   updating.present();
  //   this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
  // }

  ionViewDidLoad() {
    // this.platform.ready().then(() => {
    //   this.storageService.get("update").then(update => {
    //     if(update) {
    //       this.checkForUpdate();
    //     }
    //   });
    // });
    this.adsService.showArticlesAds();
    console.log('ionViewDidLoad HomePage');
  }

  openBookmarks() {
    this.navCtrl.push('Bookmarks');
  }

}
