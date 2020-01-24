import { Injectable } from '@angular/core';
import { AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFree } from "@ionic-native/admob-free";

/*
  Generated class for the AdsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdsServiceProvider {

  constructor(private admobFree: AdMobFree) {
    console.log('Hello AdsServiceProvider Provider');
  }

  showInterstitial() {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      autoShow: true,
      id: "" // admob banner id
    };
    this.admobFree.interstitial.config(interstitialConfig);
    return this.admobFree.interstitial.prepare();
  }


  showArticlesAds() {
    const bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: "" // admob intersticial id
    };

    this.admobFree.banner.config(bannerConfig);

    return this.admobFree.banner.prepare();
  }
}
