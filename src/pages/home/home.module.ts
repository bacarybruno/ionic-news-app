import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SuperTabsModule } from 'ionic2-super-tabs';



// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': 'fac18af5'
//   }
// };

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SuperTabsModule.forRoot()
    // CloudModule.forRoot(cloudSettings)
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
