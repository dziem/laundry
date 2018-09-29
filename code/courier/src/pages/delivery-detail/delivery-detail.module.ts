import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryDetailPage } from './delivery-detail';

@NgModule({
  declarations: [
    DeliveryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryDetailPage),
  ],
})
export class DeliveryDetailPageModule {}
