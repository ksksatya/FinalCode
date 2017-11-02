import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WaterPumpDetails } from '../../common/project/water-pumpDetail';
import { WellConstruction } from '../well-construction/well-construction.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'site-details',
  templateUrl: 'site-details.component.html',
})
export class SiteDetails {
  loadingPopup = this.loadingCtrl.create({
    content: 'Loading data...'
  });

  private siteData;
  private projectName;
  private padList;
  private boltsList;
  private vegitationList;
  private protectiveList;
  private pvcList;
  private labelList;
  private dedicateList;
  private wellHeadList;
  private wellSecureList;
  public pattern: any;
  public pattern1: any;
  public pattern2: any;
  public validationFlag = false;
  private item1: string = ""; private item2: string = ""; private item3: string = ""; private item4: string = ""; private item5: string = ""; private item6: string = ""; private item7: string = ""; private item8: string = ""; private item9: string = ""; private item10: string = "";
  private item11: string = ""; private item12: string = ""; private item13: string = "";

  private fluidForm: FormGroup;

  //private currentDate = Observable
  //       .interval(1000)
  //       .map(()=> new Date());

  constructor(public loadingCtrl: LoadingController, public navCtrl3: NavController, public params: NavParams, public dataServiceProvider: DataServiceProvider, public _form: FormBuilder, private alertCtrl: AlertController) {
    this.siteData = params.get('siteData');
    this.projectName = params.get('project');
    this.padList = ["Good", "Fair", "Needs Repair", "N/A"];
    this.boltsList = ["Good", "Fair", "Poor / Missing", "N/A"];
    this.vegitationList = ["Clear", "Light Brush", "Over Grown", "N/A"];
    this.protectiveList = ["Good", "Fair", "Damaged / Broken", "N/A"];
    this.pvcList = ["Good", "Fair", "Damaged / Broken", "N/A"];
    this.labelList = ["Present / Working", "Present / Not-Working", "Damaged / Missing", "N/A"];
    this.dedicateList = ["Yes", "No"];
    this.wellHeadList = ["Stickup", "Flush"];
    this.wellSecureList = ["Yes", "No"];
    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
    console.log(this.projectName);

    this.fluidForm = this._form.group({
      "padCondition": [this.item1, Validators.required],
      "boltsCondition": [this.item2, Validators.required],
      "protectiveCasing": [this.item3, Validators.required],
      "sorroundingVegetation": [this.item4, Validators.required],
      "pvcCasing": [this.item5, Validators.required],
      "labelLock": [this.item6, Validators.required],
      "dedicatedMeasurePoint": [this.item7, Validators.required],
      "wellHeadCompletion": [this.item8, Validators.required],
      "wellSecure": [this.item9, Validators.required],
      "depthToWater": [this.item10, Validators.required],
      "depthToProduct": [this.item11, Validators.required],
      "totalDepth": [this.item12, Validators.required],
      "notes": [this.item13]
    })
  }

  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter() {
    this.loadingPopup.dismiss();
  }

  ngOnInit() {
    console.log(this.siteData.waterpumpdetail);
    var sitePumpDetail = this.siteData.waterpumpdetail;
    if (JSON.stringify(sitePumpDetail) !== '{}') {
      // this.item1 = sitePumpDetail.padCondition;
      // this.item2 = sitePumpDetail.boltsCondition;
      // this.item3 = sitePumpDetail.protectiveCasing;
      // this.item4 = sitePumpDetail.surroundingVegetation;
      // this.item5 = sitePumpDetail.pvcCasing;
      // this.item6 = sitePumpDetail.labelAndLock;
      // this.item7 = sitePumpDetail.dedicatedMeassuringPoint;
      // this.item8 = sitePumpDetail.wellHeadCompletion;
      // this.item9 = sitePumpDetail.wellSecure;
      // this.item10 = sitePumpDetail.depthToWater;
      // this.item11 = sitePumpDetail.depthToProduct;
      // this.item12 = sitePumpDetail.totalDepth;
      // this.item13 = sitePumpDetail.notes;
    }
  }

  goBackToDetails() {
    //this.presentConfirm();
    this.navCtrl3.pop({ animate: false }).then(() => {
      const startIndex = this.navCtrl3.getActive().index - 1;
      this.navCtrl3.remove(startIndex, 1);
    });
  }

  headerNavigation(pageTitle: string) {
    if (pageTitle === 'wellcon') {
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
    else if (pageTitle === 'groundwater') {
      this.navCtrl3.push(GroundWaterSampling, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'well') {
      this.navCtrl3.push(WellReffDetails1, { siteData: this.siteData, project: this.projectName }, { animate: false })
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
  //Field Validations Start Here

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
    }
    else {
      this.pattern = false;
      this.validationFlag = true;
    }
  }

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
    }
    else {
      this.pattern1 = false;
      this.validationFlag = true;
    }
  }

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
    }
    else {
      this.pattern2 = false;
      this.validationFlag = true;
    }
  }

  //End of Field Validations    

  triggerPDF(){
    this.dataServiceProvider.exportPDF(this.projectName, this.siteData.siteName,"waterpumpdetail",["depthToProduct","totalDepth","depthToWater", "boltsCondition","dedicatedMeassuringPoint","notes", "pvcCasing", "protectiveCasing", "labelAndLock","padCondition","surroundingVegetation","wellHeadCompletion","wellSecure"
    ,"timestamp"] ,"fluid_lvl_inspdetail");
  }

  triggerCSV(){
        this.dataServiceProvider.exportCSV(this.projectName, this.siteData.siteName,"waterpumpdetail", ["depthToProduct","totalDepth","depthToWater", "boltsCondition","dedicatedMeassuringPoint","notes", "pvcCasing", "protectiveCasing", "labelAndLock","padCondition","surroundingVegetation","wellHeadCompletion","wellSecure"
        ,"timestamp"],"fluid_lvl_inspdetail");
  } 

  save() {

    let currentDate= new Date();
    let waterPumpData = new WaterPumpDetails(this.item1, this.item2, this.item4, this.item5, this.item3, this.item7,
      this.item8, this.item9, this.item10, this.item11, this.item12, this.item6, this.item13,currentDate)

    console.log(waterPumpData);

    this.dataServiceProvider.updateProjectDetails([{
      "projectName": this.projectName, "siteName": this.siteData.siteName,
      "updateWaterPumpDetail": {
        "waterpumpdetail": waterPumpData
      }
    }])

    console.log(this.item1 + " " + this.item2 + " " + this.item3 + " " + this.item4 + " " + this.item5 + " " + this.item6 + " " + this.item7 + " " + this.item8 + " " + this.item9 + " " + this.item10)

    // this.dataServiceProvider.updateProjectDetails([{
    //   "projectName": this.projectName, "siteName": this.siteData.siteName,
    //   "updateWaterPumpDetail": {
    //     "siteName": this.siteData.siteName,
    //     "siteCord": this.siteData.siteCord,
    //     "groundwaterLevelMeasurement": this.siteData.groundwaterLevelMeasurement,
    //     "groundwaterSampling": this.siteData.groundwaterSampling,
    //     "hydrocarbonSampling": this.siteData.hydrocarbonSampling,
    //     "soilSamples": this.siteData.soilSamples,
    //     "waterpump": this.siteData.waterpump,
    //     "status": this.siteData.status,
    //     "waterpumpdetail": {
    //       "padCondition": this.item1,
    //       "boltsCondition": this.item2,
    //       "surroundingVegetation": this.item4,
    //       "pvcCasing": this.item5,
    //       "protectiveCasing": this.item3,
    //       "dedicatedMeassuringPoint": this.item7,
    //       "wellHeadCompletion": this.item8,
    //       "wellSecure": this.item9,
    //       "depthToWater": this.item10,
    //       "depthToProduct": this.item11,
    //       "totalDepth": this.item12,
    //       "labelAndLock": this.item6,
    //       "notes": this.item13
    //     }
    //   }
    // }])

    this.fluidForm.reset();
  }
  //Reset the error message
  resetValidation(){
    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
  }
 //End of reset error message
 
  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.fluidForm.dirty)) {
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