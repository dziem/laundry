import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("username") username;

@ViewChild("password") password;

data:string;

constructor(private storage: Storage, public navCtrl: NavController, public alertCtrl: AlertController, 
private http: Http, public loading: LoadingController) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signUp(){this.navCtrl.push(RegisterPage);}
  signIn(){
	if(this.username.value=="" ){
		let alert = this.alertCtrl.create({
		title:"ATTENTION",
		subTitle:"Username field is empty",
		buttons: ['OK']
		});
	alert.present();} 
	else if(this.password.value==""){
		let alert = this.alertCtrl.create({
		title:"ATTENTION",
		subTitle:"Password field is empty",
		buttons: ['OK']
		});
		alert.present();
	}else{
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers });
		let data = {
			username: this.username.value,
			password: this.password.value
		};
		let loader = this.loading.create({
			content: 'Processing please wait…',
		});
		loader.present().then(() => {
			this.http.post('http://localhost/ionic2/login.php',data,options)
			.map(res => res.json())
			.subscribe(res => {
				console.log(res)
				loader.dismiss()
				if(res.status=="Your Login success"){
					this.storage.set('userID', res.userID);
					this.navCtrl.push(HomePage);
				}else{
					let alert = this.alertCtrl.create({
						title:"ERROR",
						subTitle:"Your Login Username or Password is invalid",
						buttons: ['OK']
					});
					alert.present();
				}
			});
		});
	}
  }
}
