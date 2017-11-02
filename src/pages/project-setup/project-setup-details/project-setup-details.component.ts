import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'project-setup-details',
  templateUrl: 'project-setup-details.component.html',
})
export class ProjectSetupDetails {

  
  loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
   });

  private navBarTitle = "Documents";

  private sampleLocationId;

  private locId;
  private latitude;
  private longitude;
  private dtx1;
  private dtx2;
  private dtx3;
  private Dtx1;
  private Dtx2;
  private Dtx3;
  private hisrate;
  private hisdepth;
  private fluidlevel;
  private groundwater;
  private boringwell;
  private well;
  private soil;

  private projecctsetupForm2: FormGroup;


  constructor(public loadingCtrl: LoadingController,public navCtrl2: NavController, public _form: FormBuilder, private alertCtrl: AlertController) {
    this.sampleLocationId = ["MW-1", "MW-2", "MW-3", "MW-4"];
    this.latitude = -97.23456;
    this.longitude = 29.3457;

    this.projecctsetupForm2 = this._form.group({
      "locId": [this.locId, Validators.required],
      "latitude": [this.latitude, Validators.required],
      "longitude": [this.longitude, Validators.required],
      "dtx1": [this.dtx1, Validators.required],
      "dtx2": [this.dtx2, Validators.required],
      "dtx3": [this.dtx3, Validators.required],
      "Dtx1": [this.Dtx1, Validators.required],
      "Dtx2": [this.Dtx2, Validators.required],
      "Dtx3": [this.Dtx3, Validators.required],
      "hisrate": [this.hisrate, Validators.required],
      "hisdepth": [this.hisdepth, Validators.required],
      "fluidlevel": [this.fluidlevel, Validators.required],
      "groundwater": [this.groundwater, Validators.required],
      "boringwell": [this.boringwell, Validators.required],
      "well": [this.well, Validators.required],
      "soil": [this.soil, Validators.required]
    })
  }

  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter(){
      this.loadingPopup.dismiss();
  }

  goBackToDetails() {
    this.navCtrl2.pop({ animate: false });
  }

  save() {
    console.log("save clicked");
  }

  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.projecctsetupForm2.dirty)) {
        resolve();
      }
      else {
        let confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: 'You have unsaved data! Do you want to leave?',
          buttons: [{
            text: 'Yes',
            handler: () => {
              resolve();
            },
          }, {
            text: 'No',
            handler: () => {
              reject();
            }
          }],
        });
        confirm.present();
      }
    })
  }
}