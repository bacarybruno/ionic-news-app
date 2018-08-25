import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Popover } from './popover';

@NgModule({
  declarations: [
    Popover,
  ],
  imports: [
    IonicPageModule.forChild(Popover),
  ],
  exports: [
    Popover
  ]
})
export class PopoverModule {}
