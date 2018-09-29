import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/**
 * Generated class for the RequestDeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-delivery',
  templateUrl: 'request-delivery.html',
})
export class RequestDeliveryPage {

  request: any = {};
	today: any;
	private userID:string;
	public orderID:string;
  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams,public http: Http) {
 this.today = new Date().toISOString();
 this.request.note = "";
 this.orderID = navParams.get("orderID");
 }

  ionViewDidLoad() {
	this.storage.get('userID').then((val) => {
      if(val){
		this.userID = val;
		console.log('ionViewDidLoad RequestDeliveryPage');
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
	});
  }
  
  insert(userID : string, orderID : string){
 this.request.action = "insert";
 this.request.userID = userID;
 this.request.orderID = orderID;
 this.http.post("http://localhost/ionic2/insertRequest.php",this.request).subscribe(data=>{
 console.log(data);
 let result = JSON.parse(data["_body"]);
 if(result.status == "success"){
 //this.showToast("Inserted successfully");
this.navCtrl.push(HomePage);
 }
 else{
 //this.showToast("Something went wrong");
 }
 }, err=>{
 console.log(err);
 })
 }

}
