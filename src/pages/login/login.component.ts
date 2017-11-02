import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage } from '../homepage/homepage.component';

import { DataServiceProvider } from '../../providers/data-service/data-service' ;

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {

  private username : string;
  private password : string;

  constructor(private navCtrl: NavController, private dataServiceProvider : DataServiceProvider) {
    //this.dataServiceProvider.projects();
   }

  login(){
    if(this.username==='Field.User' && this.password==='Pass@123'){
  // if(this.username==='aa' && this.password==='aa'){
       //let arrays = [];
      this.dataServiceProvider.projects();
      this.dataServiceProvider.authenticated.subscribe(data => {
        console.log("yes");
        this.loadHomePage();
      })
      //arrays = this.dataServiceProvider.getSeparateProjects('Current');
      //this.navCtrl.setRoot(HomePage);
      // this.navCtrl.push(DashboardPage);
    }
    else{
      alert("Wrong Credentials");
    }
  }

  loadHomePage(){
      this.navCtrl.setRoot(HomePage);
  } 
}
