import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WellConstructionModel } from '../../common/project/wellConstruction.model';
import { SiteDetails } from '../site-details/site-details.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';
import _ from 'lodash';

@Component({
selector: 'well-construction',
templateUrl: 'well-construction.component.html',
})
export class WellConstruction {
    
  private grade:boolean;
  private siteData;
  private projectName;
  
  private topCasing;
  private boreHoleDiameter;
  private topGrout;
  private casingDiameter;
  private topSeal;
  private casingType;
  private topFilterPack;
  private screenDiameter;
  private topScreen;
  private screenType;
  private topSump;
  private screenSlot;
  private sumpBottom;
  private filterPackType;
  private screenTypeList: Array<string>;
  private casingTypeList: Array<string>;
  private casingStick;
  public pattern: any;
  public pattern1: any;
  public pattern2: any;
  public pattern3: any;
  public pattern4: any;
  public pattern5: any;
  public pattern6: any;
  public pattern7: any; 
  public pattern8: any;
  public pattern9 : any;
  public pattern10: any;
  public pattern11: any;
  public validationFlag = false;
    
  public wellConstructionForm: FormGroup;
    
  constructor(public navCtrl: NavController, public params: NavParams , public _form: FormBuilder, public dataServiceProvider: DataServiceProvider, private alertCtrl: AlertController) {
    this.siteData = params.get('siteData');
    this.projectName = params.get('project');
    this.grade = params.get('grade');
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
    this.pattern10 = true;
    this.pattern11 = true;

    this.screenTypeList = ["Sch. 40 Pvc", "Sch. 80 Pvc","Stainless Steel","Teflon","Carbon Steel"];
    this.casingTypeList = ["Sch. 40 Pvc", "Sch. 80 Pvc","Stainless Steel","Teflon","Carbon Steel"];
    
    
    this.wellConstructionForm = this._form.group({
            "casingStick":[this.casingStick],
            "topCasing": [this.topCasing, Validators.required],
            "boreHoleDiameter": [this.boreHoleDiameter, Validators.required],
            "topGrout": [this.topGrout, Validators.required],
            "casingDiameter": [this.casingDiameter, Validators.required],
            "topSeal": [this.topSeal, Validators.required],
            "casingType": [this.casingType, Validators.required],
            "topFilterPack": [this.topFilterPack, Validators.required],
            "screenDiameter": [this.screenDiameter, Validators.required],
            "topScreen": [this.topScreen, Validators.required],
            "screenType": [this.screenType, Validators.required],
            "topSump": [this.topSump, Validators.required],
            "screenSlot": [this.screenSlot, Validators.required],
            "sumpBottom": [this.sumpBottom, Validators.required],
            "filterPackType": [this.filterPackType, Validators.required]
        })
    
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
    else if (pageTitle === 'soil') {
      this.navCtrl.push(SoilBoring, { siteData: this.siteData, project: this.projectName }, { animate: false })
    }
  }
  
  reset(){
      this.wellConstructionForm.reset();
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
    this.pattern10 = true;
    this.pattern11 = true;
      
  }
  goBackToDetails() {
        this.navCtrl.pop({ animate: false });
    }

       save(){

        let currentDate= new Date();   
        let wellConstructionData = new WellConstructionModel(this.casingStick,this.topCasing, this.boreHoleDiameter, 
                    this.topGrout, this.casingDiameter, this.topSeal,
                this.casingType, this.topFilterPack, this.screenDiameter,
                this.topScreen, this.screenType, this.topSump, this.screenSlot,
                this.sumpBottom, this.filterPackType, currentDate)
        console.log(wellConstructionData);
        this.wellConstructionForm.reset();
        this.dataServiceProvider.updateWellConstructionDetails([{
            "projectName": this.projectName, "siteName": this.siteData.siteName,
            "updateWellConstruction": {
                "wellconstruction": wellConstructionData
            }
        }])
    }
                                                                                         
                                                                                                                                                                                                                                        
   triggerPDF(){
    this.dataServiceProvider.exportPDF(this.projectName, this.siteData.siteName,"wellconstruction", ["casingStick", "topCasing","boreHoleDiameter","topGrout", "casingDiameter", "topSeal", "casingType","topFilterPack","screenDiameter","topScreen","screenType","topSump","screenSlot","sumpBottom","filterPackType","timestamp"],"well_construction_detail");
  }

  triggerCSV(){
    this.dataServiceProvider.exportCSV(this.projectName, this.siteData.siteName,"wellconstruction", ["casingStick", "topCasing","boreHoleDiameter","topGrout", "casingDiameter", "topSeal", "casingType","topFilterPack","screenDiameter","topScreen","screenType","topSump","screenSlot","sumpBottom","filterPackType","timestamp"],"well_construction_detail");
  }

  //Validations for well construction
  changeBoreHole(value1){
        if(value1 && value1.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value1)) {
            this.pattern = true;
            this.validationFlag = false;
        }
        else {
            this.pattern = false;
           this.validationFlag = true;
        }
  }
 
 changeCasingDiameter(value2){
    if(value2 &&value2.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value2)) {
            this.pattern1 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern1 = false;
           this.validationFlag = true;
        }
 }
 
 changeScreenDiameter(value3){
     if(value3 &&value3.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value3)) {
            this.pattern2 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern2 = false;
           this.validationFlag = true;
        }
 }
 
 changeSlotSize(value4){
   if(value4 &&value4.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1})$");
    }
        if (regEx.test(value4)) {
            this.pattern3 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern3 = false;
           this.validationFlag = true;
        }
 }
 
 changeTopCasing(value5){
   if(value5 && value5.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1})$");
    }
        if (regEx.test(value5)) {
            this.pattern4 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern4 = false;
           this.validationFlag = true;
        }
 }
  changeTopGrount(value6){
     if(value6 &&value6.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1})$");
    }
        if (regEx.test(value6)) {
            this.pattern5 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern5 = false;
           this.validationFlag = true;
        }
  }
  
  changeTopSeal(value7){
       if(value7 &&value7.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value7)) {
            this.pattern6 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern6 = false;
           this.validationFlag = true;
        }
  }
  
  changeFilterPack(value8){
    if(value8 &&value8.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value8)) {
            this.pattern7 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern7 = false;
           this.validationFlag = true;
        }
  }
  
  changeTopOfScreen(value9){
     if(value9 && value9.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value9)) {
            this.pattern8 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern8 = false;
           this.validationFlag = true;
        }
  }
   
   changeTopSump(value10){
     if(value10 && value10.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value10)) {
            this.pattern9 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern9 = false;
           this.validationFlag = true;
        }
   }
   
   changeSumpBottom(value11){
     if(value11 &&value11.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1,2})$");
    }
        if (regEx.test(value11)) {
            this.pattern10 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern10 = false;
           this.validationFlag = true;
        }
   }
   
   changeCasingStick(value12){
       if(value12 &&value12.indexOf('.') != -1){
      var regEx = new RegExp("^([0-9]{1}[.]{0,1}[0-9]{0,2})$");
    }
    else {
       var regEx = new RegExp("^([0-9]{1})$");
    }
        if (regEx.test(value12)) {
            this.pattern11 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern11= false;
           this.validationFlag = true;
        }
   }
  
    ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.wellConstructionForm.dirty)) {
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
