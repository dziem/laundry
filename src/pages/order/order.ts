import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

//@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
	order: any = {};
	today: any;
	private userID:string;
  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams,public http: Http) {
 this.today = new Date().toISOString();
 this.order.note = "";
 }

  ionViewDidLoad() {
	this.storage.get('userID').then((val) => {
      if(val){
		this.userID = val;
		console.log('ionViewDidLoad OrderPage');
	  }else{
		this.navCtrl.push(LoginPage); 
	  }
	});
  }
  
  insert(userID : string){
 this.order.action = "insert";
 this.order.userID = userID;
 this.http.post("http://localhost/ionic2/insertOrder.php",this.order).subscribe(data=>{
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
 
 /*showToast(message){
 let toast = this.toast.create({
 message:message,
 duration: 2000
 });
 toast.present();
 }*/

}
