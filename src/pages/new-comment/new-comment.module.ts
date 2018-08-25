import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewComment } from './new-comment';

@NgModule({
  declarations: [
    NewComment,
  ],
  imports: [
    IonicPageModule.forChild(NewComment),
  ],
  exports: [
    NewComment
  ]
})
export class NewCommentModule {}
