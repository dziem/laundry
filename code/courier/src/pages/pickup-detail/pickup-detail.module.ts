import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupDetailPage } from './pickup-detail';

@NgModule({
  declarations: [
    PickupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PickupDetailPage),
  ],
})
export class PickupDetailPageModule {}
