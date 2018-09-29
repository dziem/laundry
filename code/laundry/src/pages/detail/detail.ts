import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestDeliveryPage } from '../request-delivery/request-delivery';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
	public orderList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	this.getData(navParams.get("orderID"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');	
  }
  
  getData(orderID: string ){
 this.http.get("http://localhost/ionic2/orderDetail.php?orderID="+orderID).subscribe( data => {
 console.log(data);
 this.orderList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
 goRequest(orderID : string){
	this.navCtrl.push(RequestDeliveryPage, {
      orderID: orderID
    });
}

}
