import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { FindRequestPage } from '../find-request/find-request';
import { DeliveredDetailPage } from '../delivered-detail/delivered-detail';
import { DeliveryDetailPage } from '../delivery-detail/delivery-detail';
import { PickupDetailPage } from '../pickup-detail/pickup-detail';
import { PickedDetailPage } from '../picked-detail/picked-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public requestList:any;
	private userID:string;
  constructor(private storage: Storage, public navCtrl: NavController, public http: Http) {
  }
  
  ionViewDidLoad(){
	  this.storage.get('courierID').then((val) => {
      if(val){
		this.userID = val;
		this.getData(val);
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
   });
 }
 goFind(){
 this.navCtrl.push(FindRequestPage);
 }
 getData(userID : string ){
 this.http.get("http://localhost/ionic2/request.php?userID="+userID).subscribe( data => {
 console.log(data);
 this.requestList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
 
pickup(requestID : string){
	this.navCtrl.push(PickedDetailPage, {
      requestID: requestID
    }); 
 }
 delivery(requestID : string){
	this.navCtrl.push(DeliveredDetailPage, {
      requestID: requestID
    }); 
 }
}

