import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { PickedDetailPage } from '../picked-detail/picked-detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PickupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickup-detail',
  templateUrl: 'pickup-detail.html',
})
export class PickupDetailPage {
public requestList: any;
public request : any = {};
private userID:string;
  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl : AlertController) {
	this.getData(navParams.get("requestID"));
  }

  ionViewDidLoad() {
	  this.storage.get('courierID').then((val) => {
      if(val){
		this.userID = val;
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
	  });
    console.log('ionViewDidLoad DeliveryDetailPage');
  }
  getData(requestID: string ){
 this.http.get("http://localhost/ionic2/requestDetail.php?requestID="+requestID).subscribe( data => {
 console.log(data);
 this.requestList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
 take(requestID : string, userID : string, type : string, orderID : string){
	this.request.requestID = requestID;
	this.request.userID = userID;
	this.request.type = type;
	this.request.orderID = orderID;
 this.http.post("http://localhost/ionic2/take.php",this.request).subscribe(data=>{
 console.log(data);
 let result = JSON.parse(data["_body"]);
 if(result.status == "success"){
 //this.showToast("Inserted successfully");
 let alert = this.alertCtrl.create({
	title:"SUCCESS",
	subTitle:"You have taken this order",
	buttons: ['OK']
});
alert.present();
this.navCtrl.pop();
this.navCtrl.push(PickedDetailPage, {
      requestID: requestID
    });
 }else{
 //this.showToast("Something went wrong");
 }
 }, err=>{
 console.log(err);
 });
 }

}
