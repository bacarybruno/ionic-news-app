import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Comments } from './comments';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    Comments,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(Comments),
  ],
  exports: [
    Comments
  ]
})
export class CommentsModule {}
