import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
//import { CurrentProjectModal } from '../../common/project/current-project.modal';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { WellReffDetails2 } from '../well-reff-data/well-reff2.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SiteDetails } from '../site-details/site-details.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { WellDevelopment } from '../../common/project/well-development';
import { LoadingController } from 'ionic-angular';
import { WellConstructionModel } from '../../common/project/wellConstruction.model';
import { WellConstruction } from '../well-construction/well-construction.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';


@Component({
  selector: 'well-reff',
  templateUrl: 'well-reff1.component.html',
})
export class WellReffDetails1 {

  loadingPopup = this.loadingCtrl.create({
    content: 'Loading data...'
  });

  private showPopup: boolean = true;
  private siteData;
  private projectName;
  private wellDiameter;
  private boreHoleDiameter;
  private sandHeight;
  private filterPack;
  private depthToWater;
  private depthToProduct;
  private minimum;
  private maximum;
  private totalDepth;
  private wellRadius;
  private boreHoleRadius;
  private conversion;
  private voulumeOfWaterinWell;
  private voulumeOfWaterInFilter;
  //private assumePorosity;
  private boreHoleVolume;
  public wellDataForm: FormGroup;
  public disabledPurgeGroup: FormGroup;
  public pattern: any;
  public pattern1: any;
  public pattern2: any;
  public validationFlag = false;

  //private currentDate = Observable
  //    .interval(1000)
  //   .map(()=> new Date());

  //function to load the initial values
  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter() {
    this.loadingPopup.dismiss();
  }

  headerNavigation(pageTitle: string) {
    if (pageTitle === 'fluidlevel') {
      this.navCtrl3.push(SiteDetails, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'groundwater') {
      this.navCtrl3.push(GroundWaterSampling, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'wellcon') {
      if (this.siteData.hydrocarbonSampling == true) {
        if (this.siteData.soilboring.length > 0) {
          this.navCtrl3.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else {
          this.showWellPopup();
        }
      } else {
        this.navCtrl3.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false });
      }
    }
    else if (pageTitle === 'soil') {
      this.navCtrl3.push(SoilBoring, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
  }

  showWellPopup(){
        let confirm = this.alertCtrl.create({
                    title: "Soil boring data must be completed prior to entering well completion data.",
                    buttons: ['OK']
                    });
                    confirm.present();
    }

  ngOnInit() {
    console.log(this.siteData.welldevelopment);
    var wellDataDetails = this.siteData.welldevelopment;
    if (JSON.stringify(wellDataDetails) !== '{}') {
      // this.wellDiameter = this.wellDiameter;
      // this.boreHoleDiameter = this.boreHoleDiameter;
      this.sandHeight = ((this.totalDepth) - (this.depthToWater)).toFixed(2);
      // this.filterPack = this.filterPack;
      // this.depthToWater = wellDataDetails[0].depthToWater;
      // this.depthToProduct = wellDataDetails[0].depthToProduct;
      // this.totalDepth = wellDataDetails[0].totalDepth;
      this.wellRadius = (this.wellDiameter / 2) / 12;
      this.boreHoleRadius = (this.boreHoleDiameter / 2) / 12;
      this.conversion = 7.48;
      this.voulumeOfWaterinWell = 3.14159 * (this.wellRadius * this.wellRadius) * (this.sandHeight) * (this.conversion);
      this.voulumeOfWaterInFilter =  3.14159 * ((this.boreHoleRadius * this.boreHoleRadius) - (this.wellRadius * this.wellRadius)) * (this.conversion) * (this.filterPack) * (this.depthToProduct);
      this.boreHoleVolume = (this.voulumeOfWaterinWell) + (this.voulumeOfWaterInFilter);
      this.minimum = (3 * (this.boreHoleVolume)).toFixed(2);
      this.maximum = (10 * (this.boreHoleVolume)).toFixed(2);

    }
  }

  //function to change the sandHeight based on totalDepth change

  changeTotalDepth(value) {

    if (value && value.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }
    if (regEx.test(value)) {
      this.pattern = true;
      this.validationFlag = false;
      this.sandHeight = ((this.totalDepth) - (this.depthToWater)).toFixed(2);
      this.voulumeOfWaterinWell = 3.14159 * (this.wellRadius * this.wellRadius) * (this.sandHeight) * (this.conversion);
      this.voulumeOfWaterInFilter = 3.14159 * ((this.boreHoleRadius * this.boreHoleRadius) - (this.wellRadius * this.wellRadius)) * (this.conversion) * (this.filterPack) * (this.depthToProduct);
      this.boreHoleVolume = (this.voulumeOfWaterinWell) + (this.voulumeOfWaterInFilter);
      this.minimum = (3 * (this.boreHoleVolume)).toFixed(2);
      this.maximum = (10 * (this.boreHoleVolume)).toFixed(2);
      console.log(this.totalDepth)
      //return this.pattern
    }
    else {
      this.pattern = false;
      this.validationFlag = true;
    }
  }


  //function to change the sandHeight based on depthToWater change

  changeDepthToWater(value1) {

    if (value1 && value1.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }
    if (regEx.test(value1)) {
      this.pattern1 = true;
      this.validationFlag = false;
      this.sandHeight = ((this.totalDepth) - (this.depthToWater)).toFixed(2);
      this.voulumeOfWaterinWell = 3.14159 * (this.wellRadius * this.wellRadius) * (this.sandHeight) * (this.conversion);
      this.voulumeOfWaterInFilter = 3.14159 * ((this.boreHoleRadius * this.boreHoleRadius) - (this.wellRadius * this.wellRadius)) * (this.conversion) * (this.filterPack) * (this.depthToProduct);
      this.boreHoleVolume = (this.voulumeOfWaterinWell) + (this.voulumeOfWaterInFilter);
      this.minimum = (3 * (this.boreHoleVolume)).toFixed(2);
      this.maximum = (10 * (this.boreHoleVolume)).toFixed(2);
      console.log(this.totalDepth)
      //return this.pattern1
    }

    else {
      this.pattern1 = false;
      this.validationFlag = true
    }
  }

  //function to check the depthToProduct is empty or not

  changeDepthToProduct(value2) {

    if (value2 && value2.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }
    if (regEx.test(value2)) {
      this.pattern2 = true;
      this.validationFlag = false;
         this.sandHeight = ((this.totalDepth) - (this.depthToWater)).toFixed(2);
      this.voulumeOfWaterinWell = 3.14159 * (this.wellRadius * this.wellRadius) * (this.sandHeight) * (this.conversion);
      this.voulumeOfWaterInFilter = 3.14159 * ((this.boreHoleRadius * this.boreHoleRadius) - (this.wellRadius * this.wellRadius)) * (this.conversion) * (this.filterPack) * (this.depthToProduct);
      this.boreHoleVolume = (this.voulumeOfWaterinWell) + (this.voulumeOfWaterInFilter);
      this.minimum = (3 * (this.boreHoleVolume)).toFixed(2);
      this.maximum = (10 * (this.boreHoleVolume)).toFixed(2);
      if (this.depthToProduct === "" || this.depthToProduct === undefined) {
        this.depthToProduct = this.depthToWater;
      }
      else {
        this.depthToProduct = this.depthToProduct;
      }
      //return this.pattern2;
    }
    else {
      this.pattern2 = false;
      this.validationFlag = true
    }
  }

  constructor(public loadingCtrl: LoadingController, public navCtrl3: NavController, public params: NavParams, public dataServiceProvider: DataServiceProvider, public _form: FormBuilder, private alertCtrl: AlertController) {
    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
    this.siteData = params.get('siteData');
    this.projectName = params.get('project');
    this.wellDiameter =this.siteData.WellDiameter;
    this.boreHoleDiameter =this.siteData.BoreHoleDiameter;
    this.filterPack =this.siteData.FilterPackPorosity;
    this.wellDataForm = this._form.group({

      "depthToWater": [this.depthToWater, Validators.required],
      "depthToProduct": [this.depthToProduct, Validators.required],
      "totalDepth": [this.totalDepth, Validators.required]


    })
    this.disabledPurgeGroup = this._form.group({
      "minimum": [this.minimum, Validators.required],
      "maximum": [this.maximum, Validators.required]
    })
    this.wellDataForm.reset();
  }

  //function for back functionality
  goBackToDetails() {
    this.navCtrl3.pop({ animate: false });
  }


  //function for continue to next page of well data

  continueWellDev() {
    // this.navCtrl3.push(WellReffDetails2, { siteData: this.siteData, projectname: this.projectName, diameter: this.wellDiameter, boreHole: this.boreHoleDiameter, sandheight: this.sandHeight, filter: this.filterPack, deptWater: this.depthToWater, deptToProduct: this.depthToProduct, minVolume: this.minimum, maxVolume: this.maximum, totalDept: this.totalDepth }, { animate: false })
    let wellData = new WellDevelopment(this.wellDiameter, this.boreHoleDiameter, this.sandHeight, this.filterPack, this.depthToWater, this.depthToProduct, this.minimum, this.maximum, this.totalDepth)
    this.navCtrl3.push(WellReffDetails2, { siteData: this.siteData, projectname: this.projectName, wellDevData: wellData }, { animate: false });
    this.showPopup = false;
  }

  //Reset Error Messages
  resetValidation(){
     this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
  }
  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.wellDataForm.dirty) || !(this.showPopup)) {
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
