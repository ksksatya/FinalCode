import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SoilBoringSamples } from '../soil-boring/soil-boring-samples.component';
import { SoilBoringModel } from '../../common/project/soilBoring.model';
import { LoadingController } from 'ionic-angular';
import { SiteDetails } from '../site-details/site-details.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { WellConstruction } from '../well-construction/well-construction.component';

import { DataServiceProvider } from '../../../providers/data-service/data-service';


@Component({
  selector: 'soil-boring',
  templateUrl: 'soil-boring.component.html',
})
export class SoilBoring {

  loadingPopup = this.loadingCtrl.create({
    content: 'Loading data...'
  });

  private showPopup: boolean = true;
  private siteData;
  private projectName;
  private boringWellId: string;
  private latitude: string;
  private longitude: string;
  private owner: string;
  private boreDiameter;
  private surfaceElevation;
  private totalDepth: string;
  private drillingCompany: string;
  private drillingMethod: string;
  private driller: string;
  public soilboreform: FormGroup;
  private drillingMethodList: Array<string>;

  //private currentDate = Observable 
  //.interval(1000)
  // .map(() => new Date());

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter() {
    this.loadingPopup.dismiss();
  }

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams, public _form: FormBuilder, private alertCtrl: AlertController, public dataServiceProvider: DataServiceProvider) {
    this.siteData = params.get('siteData');
    this.projectName = params.get('project');

    this.drillingMethodList = ["Hand Auger", "Direct Push", "Hollow Stem Auger", "Solid Stem Auger", "Mud Rotary", "Air Rotary", "Sonic", "Casing/Cable"];
    this.soilboreform = this._form.group({
      "boringWellId": [this.boringWellId],
      "latitudes": [this.latitude],
      "longitudes": [this.longitude],
      "owners": [this.owner],
      "boringDiameter": [this.boreDiameter],
      "surfaceElevation": [this.surfaceElevation],
      "totalDepth": [this.totalDepth],
      "drillCompany": [this.drillingCompany, Validators.required],
      "drillMethod": [this.drillingMethod, Validators.required],
      "drillers": [this.driller, Validators.required]
    });

    this.boringWellId = this.siteData.BoringWellId;
    this.latitude =this.siteData.Latitude;
    this.longitude =this.siteData.Longitude;
    this.owner =this.siteData.Owner;
    this.boreDiameter =this.siteData.BoringDiameter;
    this.surfaceElevation =this.siteData.SurfaceElevation;
    this.totalDepth =this.siteData.TotalDepth;
  }
  goBackToDetails() {
    this.navCtrl.pop({ animate: false });
  }

  continueToSoilSamples() {
    let soilData = new SoilBoringModel(this.boringWellId, this.latitude, this.longitude, this.owner, this.boreDiameter,
      this.surfaceElevation, this.totalDepth, this.drillingCompany, this.drillingMethod, this.driller)
    this.navCtrl.push(SoilBoringSamples, { projectname: this.projectName, siteData: this.siteData, soilBoringData: soilData }, { animate: false })
    this.showPopup = false;
  }
  headerNavigation(pageTitle: string) {
    if (pageTitle === 'fluidlevel') {
      this.navCtrl.push(SiteDetails, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'groundwater') {
      this.navCtrl.push(GroundWaterSampling, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'well') {
      this.navCtrl.push(WellReffDetails1, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'wellcon') {
      if (this.siteData.hydrocarbonSampling == true) {
        if (this.siteData.soilboring.length > 0) {
          this.navCtrl.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else {
          this.showWellPopup();
        }
      } else {
        this.navCtrl.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false });
      }
    }
  }

  showWellPopup(){
        let confirm = this.alertCtrl.create({
                    title: "Soil boring data must be completed prior to entering well completion data.",
                    buttons: ['OK']
                    });
                    confirm.present();
    }

  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.soilboreform.dirty) || (!this.showPopup)) {
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