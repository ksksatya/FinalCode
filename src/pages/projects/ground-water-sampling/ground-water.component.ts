import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { SampleModel } from '../../common/project/sampling.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteDetails } from '../site-details/site-details.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { GroundWaterDetail } from '../../common/project/groundWaterDetail';
import { WellConstruction } from '../well-construction/well-construction.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';
import { LoadingController } from 'ionic-angular';

import _ from 'lodash';

@Component({
  selector: 'ground-water',
  templateUrl: 'ground-water.component.html',
})
export class GroundWaterSampling implements OnInit {


  loadingPopup = this.loadingCtrl.create({
    content: 'Loading data...'
  });


  private siteData;
  private projectName;
  private suggestSpeed;
  private suggestDepth;
  private wellDiameter;
  private initailDepthToWater;
  private pumpSpeed;
  private intakeDepth;
  private drawDown;
  private alkalinity;
  private temp;
  private turbines;
  private dissolve;
  private oxygen;
  private conductivity;
  private units;
  public groundform: FormGroup;
  public groundformdisabled: FormGroup;
  public loading: boolean = false;

  private acidityStable: boolean = false;
  private tempStable: boolean = false;
  private turbStable: boolean = false;
  private disStable: boolean = false;
  private oxyStable: boolean = false;
  private conductivityStable: boolean = false;

  private sampling_data: Array<{ sample_number: number, sample_data: GroundWaterDetail }> = [];

  private sampleValue: number;
  private viewSample: number;
  private sampling_intervals: Array<SampleModel>;

  private isDisabled: boolean = false;

  public validationFlag = false;
  public pattern: any;
  public pattern1: any;
  public pattern2: any;
  public pattern3: any;
  public pattern4: any;
  public pattern5: any;
  public pattern6: any;
  public pattern7: any;
  public pattern8: any;
  public pattern9: any;

  // private currentDate = Observable
  // .interval(1000)
  //.map(() => new Date());

  constructor(public loadingCtrl: LoadingController, public navCtrl3: NavController, public params: NavParams, public dataServiceProvider: DataServiceProvider, public _form: FormBuilder, private alertCtrl: AlertController) {

    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
    this.pattern3 = true;
    this.pattern4 = true;
    this.pattern5 = true;
    this.pattern6 = true;
    this.pattern7 = true;
    this.pattern8 = true;
    this.pattern9 = true;
    this.siteData = params.get('siteData');
    this.projectName = params.get('project');
    this.suggestSpeed = this.siteData.SuggestedFlowRate;
    this.suggestDepth = this.siteData.SuggestedIntakeDepth;
    this.wellDiameter = this.siteData.WellDiameter;

    console.log(this.projectName);
    console.log(this.siteData);
    console.log(this.siteData.groundwatersample);

    this.groundform = this._form.group({
   // "initailDepthToWater": [this.initailDepthToWater, Validators.required],
      "flowRate": [this.pumpSpeed, Validators.required],
      "intakeDepth": [this.intakeDepth, Validators.required],
      "drawDown": [this.drawDown, Validators.required],
      "acidity": [this.alkalinity, Validators.required],
      "temperature": [this.temp, Validators.required],
      "turbidity": [this.turbines, Validators.required],
      "dissolvedOxygen": [this.dissolve, Validators.required],
      "oxygenReduction": [this.oxygen, Validators.required],
      "specificConductivity": [this.conductivity, Validators.required],
      "units": [this.units, Validators.required]

    })

    this.groundformdisabled = this._form.group({
      "suggestedFlow": [this.suggestSpeed, Validators.required],
      "suggestedIntake": [this.suggestDepth, Validators.required],
      "wellDia": [this.wellDiameter, Validators.required],
      "initailDepthToWater": [this.initailDepthToWater, Validators.required]
    })
  }


  ngOnInit() {
    this.initialiseSamples();
    let groundWaterDetail : Array<GroundWaterDetail>;
    groundWaterDetail = this.siteData.groundwaterdetail;
    console.log(groundWaterDetail);
    if(groundWaterDetail.length >0){
      let groundData : GroundWaterDetail;
      groundData = _.last(groundWaterDetail);
      this.suggestSpeed = groundData.suggestedpumpspeed;
      this.suggestDepth = groundData.suggestedintakedepth;
      this.wellDiameter = groundData.welldia;
      this.initailDepthToWater = groundData.initaildepthtowater;
      this.pumpSpeed = "";
      this.intakeDepth = "";
      this.drawDown = "";
      this.alkalinity = "";
      this.temp = "";
      this.turbines = "";
      this.dissolve = "";
      this.oxygen = "";
      this.conductivity = "";
      this.units = "";
      
      this.sampleValue = 1;
      this.viewSample = 1;    
      groundWaterDetail.forEach((groundWaterSampleData) => {
        this.sampling_data.push({ "sample_number": this.sampleValue, "sample_data": groundWaterSampleData });
        this.sampleValue++;
        this.viewSample++;      
      })    
      console.log(this.sampling_data);
      //this.sampleValue--;
      let currentSample = _.findIndex(this.sampling_intervals, { visible : true});
      this.sampling_intervals[currentSample].visible = false;
      let activeSample = _.findIndex(this.sampling_intervals, { sample_number : this.sampleValue});
      this.sampling_intervals[activeSample].visible = true;
      this.moveToSample(this.sampleValue);
    }
    
    
    //this.moveToSample(this.sampleValue-1);
    if (JSON.stringify(groundWaterDetail) !== '{}') {
      // this.suggestSpeed = this.suggestSpeed;
      // this.suggestDepth = this.suggestDepth;
      // this.wellDiameter = this.wellDiameter;
      // this.initailDepthToWater = groundWaterDetail.initaildepthtowater;
      // this.pumpSpeed = groundWaterDetail.pumpspeed;
      // this.intakeDepth = groundWaterDetail.intakedepth;
      // this.drawDown = groundWaterDetail.drawdown;
      // this.alkalinity = groundWaterDetail.acidity;
      // this.temp = groundWaterDetail.temperature;
      // this.turbines = groundWaterDetail.turbidity;
      // this.dissolve = groundWaterDetail.dissolvedoxygen;
      // this.oxygen = groundWaterDetail.oxygenreductionpotential;
      // this.conductivity = groundWaterDetail.specificconductivity;
      // this.units = groundWaterDetail.units;
    }
    
  }

  ionViewWillEnter() {
    // Show the popup
    this.loadingPopup.present();
  }

  ionViewDidEnter() {
    this.loadingPopup.dismiss();
  }

  initialiseSamples() {
    this.sampling_intervals = [
      { sample_number: 1, visible: true, viewing: true },
      { sample_number: 2, visible: false, viewing: false },
      { sample_number: 3, visible: false, viewing: false },
      { sample_number: 4, visible: false, viewing: false },
      { sample_number: 5, visible: false, viewing: false },
      { sample_number: 6, visible: false, viewing: false },
      { sample_number: 7, visible: false, viewing: false },
      { sample_number: 8, visible: false, viewing: false },
      { sample_number: 9, visible: false, viewing: false }
    ]

    this.sampleValue = 1;
    this.viewSample = 1;

  }

  headerNavigation(pageTitle: string) {
    if (pageTitle === 'fluidlevel') {
      this.navCtrl3.push(SiteDetails, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
    else if (pageTitle === 'well') {
      this.navCtrl3.push(WellReffDetails1, { siteData: this.siteData, project: this.projectName }, { animate: false })
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

  goBackToDetails() {
    this.navCtrl3.pop({ animate: false });
  }

  //Field Validations Start Here

  changeFlowRate(value) {
   
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

  changeIntakeDepth(value1) {
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

  changeDrawDown(value8) {
    if (value8 && value8.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }

    if (regEx.test(value8)) {
      this.pattern8 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern8 = false;
      this.validationFlag = true;
    }
  }

  changeInitialDeptWater(value9) {
    if (value9 && value9.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }
    if (regEx.test(value9)) {
      this.pattern9 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern9 = false;
      this.validationFlag = true;
    }
  }

  changeAcidityAlkalinity(value2) {
    if (value2 && value2.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,2})$");
    }

    if (regEx.test(value2)) {
      this.pattern2 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern2 = false;
      this.validationFlag = true;
    }
    this.showAcidityTicks();
  }

  changeTemperature(value3) {
    if (value3 && value3.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,2})$");
    }
    if (regEx.test(value3)) {
      this.pattern3 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern3 = false;
      this.validationFlag = true;
    }
    this.showTempTicks();
  }

  changeTurbidity(value4) {
    if (value4 && value4.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,2})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,3})$");
    }
    if (regEx.test(value4)) {
      this.pattern4 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern4 = false;
      this.validationFlag = true;
    }
    this.showTurbTicks();
  }

  changeDissolbedOxygen(value5) {
    if (value5 && value5.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,2})$");
    }
    if (regEx.test(value5)) {
      this.pattern5 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern5 = false;
      this.validationFlag = true;
    }
    this.showDisTicks();
  }

  changeOxygen(value6) {
    if (value6 && value6.indexOf('.') != -1) {
      var regEx = new RegExp("^-?([0-9]{1,3}[.]{0,1}[0-9]{0,1})$");
    }
    else {
      var regEx = new RegExp("^-?([0-9]{1,3})$");
    }
    if (regEx.test(value6)) {
      this.pattern6 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern6 = false;
      this.validationFlag = true;
    }
    this.showOxyTicks();
  }

  changeConductivity(value7) {
    if (value7 && value7.indexOf('.') != -1) {
      var regEx = new RegExp("^([0-9]{1,4}[.]{0,1}[0-9]{0,3})$");
    }
    else {
      var regEx = new RegExp("^([0-9]{1,4})$");
    }
    if (regEx.test(value7)) {
      this.pattern7 = true;
      this.validationFlag = false;
    }
    else {
      this.pattern7 = false;
      this.validationFlag = true;
    }
    this.showConTicks();
  }
  //Field Validations End Here

  save() {

    let currentDate = new Date();
    let groundWaterData = new GroundWaterDetail(this.suggestSpeed, this.suggestDepth, this.wellDiameter, this.initailDepthToWater, this.pumpSpeed, this.intakeDepth, this.drawDown, this.alkalinity, this.temp, this.turbines, this.dissolve, this.oxygen, this.conductivity, this.units, currentDate)
    console.log(groundWaterData);
    this.dataServiceProvider.updateGroundDetail([{
      "projectName": this.projectName, "siteName": this.siteData.siteName,
      "updateGroundDetails": {
        "groundwaterdetail": groundWaterData
      }
    }])

    // this.dataServiceProvider.updateGroundDetail([{
    //   "projectName": this.projectName, "siteName": this.siteData.siteName,
    //   "updateGroundDetails": {
    //     "siteName": this.siteData.siteName,
    //     "siteCord": this.siteData.siteCord,
    //     "groundwaterLevelMeasurement": this.siteData.groundwaterLevelMeasurement,
    //     "groundwaterSampling": this.siteData.groundwaterSampling,
    //     "hydrocarbonSampling": this.siteData.hydrocarbonSampling,
    //     "soilSamples": this.siteData.soilSamples,
    //     "waterpump": this.siteData.waterpump,
    //     "status": this.siteData.status,
    //     "groundwaterdetail": {
    //       "suggestedpumpspeed": this.suggestSpeed,
    //       "suggestedintakedepth": this.suggestDepth,
    //       "welldia": this.wellDiameter,
    //       "pumpspeed": this.pumpSpeed,
    //       "intakedepth": this.intakeDepth,
    //       "drawdown": this.drawDown,
    //       "acidity": this.alkalinity,
    //       "temperature": this.temp,
    //       "turbidity": this.turbines,
    //       "dissolvedoxygen": this.dissolve,
    //       "oxygenreductionpotential": this.oxygen,
    //       "specificconductivity": this.conductivity
    //     }
    //   }
    // }])

    // Pushing data to array
    // let sample = new GroundWaterDetail(this.suggestSpeed, this.suggestDepth, this.wellDiameter, this.pumpSpeed,
    //   this.intakeDepth, this.drawDown, this.alkalinity, this.temp, this.turbines, this.dissolve,
    //   this.oxygen, this.conductivity, this.units)

    this.sampling_data.push({ "sample_number": this.sampleValue, "sample_data": groundWaterData });

    console.log(this.sampling_data);


    this.groundform.reset();
    // this.groundform.controls.units.reset();
    // this.groundform.controls.specificConductivity.reset();
    // this.groundform.controls.oxygenReduction.reset();
    // this.groundform.controls.dissolvedOxygen.reset();
    // this.groundform.controls.turbidity.reset();
    // this.groundform.controls.temperature.reset();
    // this.groundform.controls.acidity.reset();
    // this.groundform.controls.drawDown.reset();
    // this.groundform.controls.intakeDepth.reset();
    // this.groundform.controls.flowRate.reset();
    this.acidityStable = false;
    this.tempStable = false;
    this.turbStable = false;
    this.disStable = false;
    this.oxyStable = false;
    this.conductivityStable = false;
    this.increaseSampleLevel();
  }

                                                                                                                                                                                                   
  triggerPDF(){
    this.dataServiceProvider.exportPDF(this.projectName, this.siteData.siteName,"groundwaterdetail", ["suggestedpumpspeed", "suggestedintakedepth","welldia","initaildepthtowater", "pumpspeed", "intakedepth", "drawdown","acidity","temperature","turbidity","dissolvedoxygen","oxygenreductionpotential","specificconductivity","units","timestamp"],"gwsampledetail");
  }

  triggerCSV(){
    this.dataServiceProvider.exportCSV(this.projectName, this.siteData.siteName,"groundwaterdetail", ["suggestedpumpspeed", "suggestedintakedepth","welldia","initaildepthtowater", "pumpspeed", "intakedepth", "drawdown","acidity","temperature","turbidity","dissolvedoxygen","oxygenreductionpotential","specificconductivity","units","timestamp"],"gwsampledetail");
  } 

  //Green tick validation strats Here
  showTempTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.temp !='') {
      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
      let diff_1_temp = this.temp - prev_sample1.sample_data.temperature;
      let diff_2_temp = this.temp - prev_sample2.sample_data.temperature;

      if ((diff_1_temp <= 1 && diff_1_temp >= -1) && (diff_2_temp <= 1 && diff_2_temp >= -1)) {
        this.tempStable = true;
      } else {
        this.tempStable = false;
      }
    }else{
      this.tempStable = false;
    }
  }
  showTurbTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.turbines !='') {
      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
      let diff_1_turb = this.turbines - prev_sample1.sample_data.turbidity;
      let diff_2_turb = this.turbines - prev_sample2.sample_data.turbidity;

      if ((diff_1_turb <= this.turbines * 0.1 && diff_1_turb >= -this.turbines * 0.1)
        && (diff_2_turb <= this.turbines * 0.1 && diff_2_turb >= -this.turbines * 0.1)) {
        this.turbStable = true;
      } else {
        this.turbStable = false;
      }
    }else{
      this.turbStable = false;
    }
  }
  showDisTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.dissolve !='') {
      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
      let diff_1_dis = this.dissolve - prev_sample1.sample_data.dissolvedoxygen;
      let diff_2_dis = this.dissolve - prev_sample2.sample_data.dissolvedoxygen;

      if ((diff_1_dis <= this.dissolve * 0.1 && diff_1_dis >= -this.dissolve * 0.1)
        && (diff_2_dis <= this.dissolve * 0.1 && diff_2_dis >= -this.dissolve * 0.1)) {
        this.disStable = true;
      } else {
        this.disStable = false;
      }
    }else{
      this.disStable = false;
    }
  }
  showOxyTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.oxygen !='') {
      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
      let diff_1_oxy = this.oxygen - prev_sample1.sample_data.oxygenreductionpotential;
      let diff_2_oxy = this.oxygen - prev_sample2.sample_data.oxygenreductionpotential;

      if ((diff_1_oxy <= 10 && diff_1_oxy >= -10) && (diff_2_oxy <= 10 && diff_2_oxy >= -10)) {
        this.oxyStable = true;
      } else {
        this.oxyStable = false;
      }
    }else {
        this.oxyStable = false;
      }
  }
  showConTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.conductivity !='') {
      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
      let diff_1_conductivity = this.conductivity - prev_sample1.sample_data.specificconductivity;
      let diff_2_conductivity = this.conductivity - prev_sample2.sample_data.specificconductivity;

      if ((diff_1_conductivity <= this.conductivity * 0.3 && diff_1_conductivity >= -this.conductivity * 0.3)
        && (diff_2_conductivity <= this.conductivity * 0.3 && diff_2_conductivity >= -this.conductivity * 0.3)) {
        this.conductivityStable = true;
      } else {
        this.conductivityStable = false;
      }
    } else {
        this.conductivityStable = false;
      }
  }
  showAcidityTicks() {
    if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.alkalinity != '') {

      let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
      let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });

      //acidity
      let diff_1_acid = this.alkalinity - prev_sample1.sample_data.acidity;
      let diff_2_acid = this.alkalinity - prev_sample2.sample_data.acidity;

      if ((diff_1_acid <= 0.1 && diff_1_acid >= -0.1) && (diff_2_acid <= 0.1 && diff_2_acid >= -0.1)) {
        this.acidityStable = true;
      } else {
        this.acidityStable = false;
      }
    }else {
        this.acidityStable = false;
      }
  }

  // Green Tick validation ends Here

  increaseSampleLevel() {
    if (this.sampling_intervals !== undefined) {
      let index = _.findIndex(this.sampling_intervals, { sample_number: this.sampleValue });
      let sample_length = this.sampling_intervals.length;
      sample_length--;
      if (index < sample_length) {
        this.sampling_intervals[index].visible = false;
        this.sampling_intervals[index].viewing = false;
        index++;
        this.sampling_intervals[index].visible = true;
        this.sampling_intervals[index].viewing = true;
        this.sampleValue++;
        this.viewSample++;
      }
    }
  }

  addSample() {
    let length = this.sampling_intervals.length;
    length++;
    let newsample = { sample_number: length, visible: false, viewing: false };

    this.sampling_intervals.push(newsample);
  }

  showSample(sampleNumber) {
    if (!(this.groundform.dirty)) {
      this.moveToSample(sampleNumber);
    }
    else {
      let confirm = this.alertCtrl.create({
        title: 'Are you sure?',
        message: 'You have unsaved data! Do you want to leave?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.moveToSample(sampleNumber);
          },
        }, {
          text: 'No',
          handler: () => {
            console.log("stay");
          }
        }],
      });
      confirm.present();
    }
  }

  moveToSample(sampleNumber) {
    if (sampleNumber <= this.sampling_data.length) {

      // this.pumpSpeed = "";
      // this.intakeDepth = "";
      // this.drawDown = "";
      // this.alkalinity = "";
      // this.temp = "";
      // this.turbines = "";
      // this.dissolve = "";
      // this.oxygen = "";
      // this.conductivity = "";
      // this.units = "";

      let sample = _.find(this.sampling_data, { sample_number: sampleNumber });

      let viewCurrent = _.findIndex(this.sampling_intervals, { viewing: true });
      this.sampling_intervals[viewCurrent].viewing = false;
      let viewIndex = _.findIndex(this.sampling_intervals, { sample_number: sampleNumber });
      this.sampling_intervals[viewIndex].viewing = true;
      this.viewSample = sampleNumber;

      console.log(sample);

      this.groundform.reset({
        //"initailDepthToWater": [sample.sample_data.initaildepthtowater],
        "flowRate": [sample.sample_data.pumpspeed],
        "intakeDepth": [sample.sample_data.intakedepth],
        "drawDown": [sample.sample_data.drawdown],
        "acidity": [sample.sample_data.acidity],
        "temperature": [sample.sample_data.temperature],
        "turbidity": [sample.sample_data.turbidity],
        "dissolvedOxygen": [sample.sample_data.oxygenreductionpotential],
        "oxygenReduction": [sample.sample_data.oxygenreductionpotential],
        "specificConductivity": [sample.sample_data.specificconductivity],
        "units": [sample.sample_data.units]
      })
      // this.suggestSpeed = this.suggestSpeed;
      // this.suggestDepth = this.suggestDepth;
      // this.wellDiameter = this.siteData.groundwaterdetail.welldia;
      //this.initailDepthToWater = sample.sample_data.initaildepthtowater;
      // this.pumpSpeed = sample.sample_data.pumpspeed;
      // this.intakeDepth = sample.sample_data.intakedepth;
      // this.drawDown = sample.sample_data.drawdown;
      // this.alkalinity = sample.sample_data.acidity;
      // this.temp = sample.sample_data.temperature;
      // this.turbines = sample.sample_data.turbidity;
      // this.dissolve = sample.sample_data.dissolvedoxygen;
      // this.oxygen = sample.sample_data.oxygenreductionpotential;
      // this.conductivity = sample.sample_data.specificconductivity;
      // this.units = sample.sample_data.units;

      this.isDisabled = true;
    } else if (sampleNumber == (this.sampling_data.length + 1)) {

      let viewCurrent = _.findIndex(this.sampling_intervals, { viewing: true });
      this.sampling_intervals[viewCurrent].viewing = false;

      let viewIndex = _.findIndex(this.sampling_intervals, { sample_number: sampleNumber });
      this.sampling_intervals[viewIndex].viewing = true;
      this.viewSample = sampleNumber;

      this.pumpSpeed = "";
      this.intakeDepth = "";
      this.drawDown = "";
      this.alkalinity = "";
      this.temp = "";
      this.turbines = "";
      this.dissolve = "";
      this.oxygen = "";
      this.conductivity = "";
      this.units = "";

      this.isDisabled = false;
    } else {
      let alert = this.alertCtrl.create({
        title: 'No Data',
        subTitle: 'These samples are not filled yet',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
    this.pattern3 = true;
    this.pattern4 = true;
    this.pattern5 = true;
    this.pattern6 = true;
    this.pattern7 = true;
    this.pattern8 = true;
    this.pattern9 = true;
    this.showTempTicks();
    this.showTurbTicks();
    this.showAcidityTicks();
    this.showConTicks();
    this.showDisTicks();
    this.showOxyTicks();
  }

  //Reset Error Messages
  
  resetValidation(){
    this.pattern = true;
    this.pattern1 = true;
    this.pattern2 = true;
    this.pattern3 = true;
    this.pattern4 = true;
    this.pattern5 = true;
    this.pattern6 = true;
    this.pattern7 = true;
    this.pattern8 = true;
    this.pattern9 = true;
  }
  //End of Reset Error Messages
  
  ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.groundform.dirty)) {
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