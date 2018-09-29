import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindRequestPage } from './find-request';

@NgModule({
  declarations: [
    FindRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(FindRequestPage),
  ],
})
export class FindRequestPageModule {}
