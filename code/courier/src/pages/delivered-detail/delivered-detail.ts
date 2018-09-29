import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the DeliveredDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivered-detail',
  templateUrl: 'delivered-detail.html',
})
export class DeliveredDetailPage {
public requestList: any;
public request: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl : AlertController) {
	this.getData(navParams.get("requestID"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveredDetailPage');
  }
  getData(requestID: string ){
 this.http.get("http://localhost/ionic2/requestDetail.php?requestID="+requestID).subscribe( data => {
 console.log(data);
 this.requestList = JSON.parse(data["_body"]);
 }, err =>{
 console.log(err);
 });
 }
 done(requestID : string, orderID : string){
	this.request.requestID = requestID;
	this.request.orderID = orderID;
	this.request.type = 'Delivery';
 this.http.post("http://localhost/ionic2/done.php",this.request).subscribe(data=>{
 console.log(data);
 let result = JSON.parse(data["_body"]);
 if(result.status == "success"){
 //this.showToast("Inserted successfully");
 let alert = this.alertCtrl.create({
	title:"SUCCESS",
	subTitle:"You have picked up this order",
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
