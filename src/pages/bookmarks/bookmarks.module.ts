import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bookmarks } from './bookmarks';

@NgModule({
  declarations: [
    Bookmarks,
  ],
  imports: [
    IonicPageModule.forChild(Bookmarks),
  ],
  exports: [
    Bookmarks
  ]
})
export class BookmarksModule {}
