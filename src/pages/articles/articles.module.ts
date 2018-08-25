import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlesPage } from './articles';
import { MomentModule } from 'angular2-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    ArticlesPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlesPage),
    MomentModule,
    LazyLoadImageModule    
  ],
  exports: [
    ArticlesPage
  ]
})
export class ArticlesPageModule {}
