import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FindRequestPage } from '../pages/find-request/find-request';
import { DeliveredDetailPage } from '../pages/delivered-detail/delivered-detail';
import { DeliveryDetailPage } from '../pages/delivery-detail/delivery-detail';
import { PickupDetailPage } from '../pages/pickup-detail/pickup-detail';
import { PickedDetailPage } from '../pages/picked-detail/picked-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	LoginPage,
	FindRequestPage,
	DeliveredDetailPage,
	DeliveryDetailPage,
	PickupDetailPage,
	PickedDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	HttpModule,
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	LoginPage,
	FindRequestPage,
	DeliveredDetailPage,
	DeliveryDetailPage,
	PickupDetailPage,
	PickedDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
