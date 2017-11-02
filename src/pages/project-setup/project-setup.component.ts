import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ProjectSetupDetails } from './project-setup-details/project-setup-details.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

// import { Observable } from 'rxjs/Rx';
// import {DataServiceProvider} from '../../../providers/data-service/data-service';

@Component({
  selector: 'project-setup',
  templateUrl: 'project-setup.component.html',
})
export class ProjectSetup {

  loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
   });
  

  private projectname;
  private projectno;
  private item1;
  private item2;
  private item3;
  private startDate;
  private endDate;
  private background = "Information to be included in this section would be history of sites";
  private background2 = "Rolando.Gomez@gmail.com, Rolando.Gomez@yahoo.com , ERMSira@gmail.com";

  private city;
  private state;
  private country;

  private projecctsetupForm1: FormGroup;


  constructor(public loadingCtrl: LoadingController,public navCtrl1: NavController, public _form: FormBuilder, private alertCtrl: AlertController) {
    this.city = ["Bangalore", "Pune", "Chennai", "Delhi"];
    this.state = ["Karnataka", "Maharashtra", "Goa", "Kerala"];
    this.country = ["India", "UK", "Germany", "Switzerland"];

    this.projecctsetupForm1 = this._form.group({
      "projectname": [this.projectname, Validators.required],
      "projectno": [this.projectno, Validators.required],
      "city": [this.item1, Validators.required],
      "state": [this.item2, Validators.required],
      "country": [this.item3, Validators.required],
      "startdate": [this.startDate, Validators.required],
      "enddate": [this.endDate, Validators.required],
      "background": [this.background, Validators.required],
      "background2": [this.background2, Validators.required]
    })
  }

  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter(){
      this.loadingPopup.dismiss();
  }
  
  goBackToDetails() {
    this.navCtrl1.pop({ animate: false });
  }
  continue() {
    this.navCtrl1.push(ProjectSetupDetails, {}, { animate: false })
  }

  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.projecctsetupForm1.dirty)) {
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