import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickedDetailPage } from './picked-detail';

@NgModule({
  declarations: [
    PickedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PickedDetailPage),
  ],
})
export class PickedDetailPageModule {}
