import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CapitalizePipe } from './capitalize';
import { KeepHtml } from './keep-html';

@NgModule({
  imports: [
    IonicPageModule.forChild(CapitalizePipe),
    IonicPageModule.forChild(KeepHtml)
  ],
  declarations: [
    CapitalizePipe,
    KeepHtml
  ],
  exports: [
    CapitalizePipe,
    KeepHtml
  ]
})
export class PipesModule {}