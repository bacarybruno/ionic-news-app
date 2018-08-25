import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Articles } from '../providers/articles';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppRate } from '@ionic-native/app-rate';
import { IonicStorageModule } from "@ionic/storage";
import { OneSignal } from "@ionic-native/onesignal";
import { AdMobFree } from '@ionic-native/admob-free';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Device } from '@ionic-native/device';
import { AdsServiceProvider } from '../providers/ads-service/ads-service';

import { DetailsPage } from '../pages/details-page/details-page';
import { PipesModule } from '../pipes/pipes.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    MyApp,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    PipesModule,
    IonicModule.forRoot(MyApp, {
        scrollAssist: false,
        autoFocusAssist: false,
        tabsHideOnSubPages: true,
        activator: 'highlight'
      },
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage
  ],
  providers: [
    Articles,
    StatusBar,
    SplashScreen,
    SocialSharing,
    OneSignal,
    AdMobFree,
    AppRate,
    Device,
    GoogleAnalytics,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdsServiceProvider
  ]
})
export class AppModule {}
