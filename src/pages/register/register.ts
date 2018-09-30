import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	user: any = {};
  constructor(private storage: Storage, public navCtrl: NavController, public http: Http, public toast: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  insert(){
 this.user.action = "insert";
 this.http.post("http://localhost/ionic2/register.php",this.user).subscribe(data=>{
 console.log(data);
 let result = JSON.parse(data["_body"]);
 if(result.status == "success"){
 //this.showToast("Inserted successfully");
 this.storage.set('userID', result.userID);
this.navCtrl.push(HomePage);
 }
 else{
 this.showToast("Something went wrong");
 }
 }, err=>{
 console.log(err);
 })
 }
 
 showToast(message){
 let toast = this.toast.create({
 message:message,
 duration: 2000
 });
 toast.present();
 }

}
