import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the PickedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picked-detail',
  templateUrl: 'picked-detail.html',
})
export class PickedDetailPage {
public requestList: any;
public request: any = {};
public typep : number = 0;
public timep : number = 0;
public totalp : number = 0;
public ovrp : number = 0;
public weight : number;
public paid : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl : AlertController) {
	this.getData(navParams.get("requestID"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickedDetailPage');
  }
  getData(requestID: string ){
 this.http.get("http://localhost/ionic2/requestDetail.php?requestID="+requestID).subscribe( data => {
 console.log(data);
 this.requestList = JSON.parse(data["_body"]);
 if(this.requestList[0].stype == "Wash"){
	this.typep = 4000;
 }else if(this.requestList[0].stype == "Wash and Iron"){
	this.typep = 5000;
 }
 if(this.requestList[0].stime == "Regular"){
	this.timep = 0;
 }else if(this.requestList[0].stime == "Fast"){
	this.timep = 1500;
 }if(this.requestList[0].stime == "Super Fast"){
	this.timep = 3000;
 }
 this.totalp = this.typep + this.timep;
 }, err =>{
 console.log(err);
 });
 }
setPrice(weight: number){
	this.ovrp = this.totalp * weight;
}
done(requestID : string, weight : number, ovrp : number, paid : boolean, orderID : string){
	this.request.requestID = requestID;
	this.request.orderID = orderID;
	this.request.weight = weight;
	this.request.ovrp = ovrp;
	this.request.type = 'Pickup';
	if(paid == true){
		this.request.paid = "Paid";
	}else{
		this.request.paid = "Not Paid";
	}
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
