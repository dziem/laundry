import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { OrderPage} from '../order/order'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';
import { RequestDeliveryPage } from '../request-delivery/request-delivery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public orderList:any;
	private userID:string;
  constructor(private storage: Storage, public navCtrl: NavController, public http: Http) {
  }
  
  ionViewDidLoad(){
	  this.storage.get('userID').then((val) => {
      if(val){
		this.userID = val;
		this.getData(val);
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
   });
 }
 goAddNew(){
 this.navCtrl.push(OrderPage);
 }
 getData(userID : string ){
 this.http.get("http://localhost/ionic2/order.php?userID="+userID).subscribe( data => {
 console.log(data);
 this.orderList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
goDetail(orderID : string){
	this.navCtrl.push(DetailPage, {
      orderID: orderID
    });
}
goRequest(orderID : string){
	this.navCtrl.push(RequestDeliveryPage, {
      orderID: orderID
    });
}
}

