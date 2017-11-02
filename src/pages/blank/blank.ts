import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
selector: 'blank-page',
templateUrl: 'blank.html',
})
export class BlankPage {

  loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
   });

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public params:NavParams) {
    
  } 
  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter(){
      this.loadingPopup.dismiss();
  }
}