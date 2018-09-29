import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { DeliveryDetailPage } from '../delivery-detail/delivery-detail';
import { PickupDetailPage } from '../pickup-detail/pickup-detail';

//@IonicPage()
@Component({
  selector: 'page-find-request',
  templateUrl: 'find-request.html',
})
export class FindRequestPage {
	public requestList:any;
	private userID:string;
  constructor(private storage: Storage, public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindRequestPage');
	this.storage.get('courierID').then((val) => {
      if(val){
		this.userID = val;
		this.getData();
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
   });
  }
  getData(){
 this.http.get("http://localhost/ionic2/requestWaiting.php").subscribe( data => {
 console.log(data);
 this.requestList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
 pick(requestID : string){
	this.navCtrl.push(PickupDetailPage, {
      requestID: requestID
    }); 
 }
 deliver(requestID : string){
	this.navCtrl.push(DeliveryDetailPage, {
      requestID: requestID
    }); 
 }

}
